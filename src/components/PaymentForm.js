import React, { useState } from 'react';
import { Save, Send, FileText} from 'lucide-react';
<<<<<<< HEAD
import Header from './Header';
=======

>>>>>>> d158b42 (merged and routed paymentform to dashboard)
import InstructionDetails from './InstructionDetails';
import PaymentDetailsTable from './PaymentDetailsTable';
import DraftManagement from './DraftManagement';
import { saveDraftToStorage } from '../utils/draftUtils';


// page component
const PaymentForm = () => {
  const ROWS_PER_PAGE = 10;
  
  // instruction details
  const [instructionDetails, setInstructionDetails] = useState({
    paymentCurrency: '',
    debitAccount: '',
    valueDate: new Date().toISOString().split('T')[0]
  });

  //  payment rows
  const [rows, setRows] = useState([{
    paymentMethod: '',
    payeeDetails: '',
    payeeNature: '',
    bankDetails: '',
    yourReference: '',
    paymentReference: '',
    amount: '',
    notesToPayee: '',
    additionalNotes: ''
  }]);

  // Page state
  const [currentPage, setCurrentPage] = useState(1);

  // State for errors
  const [errors, setErrors] = useState({
    instruction: {},
    rows: []
  });

  const [showDrafts, setShowDrafts] = useState(false);

 
  //  helper to load a draft back 
  const handleEditDraft = (draft) => {
    if (!draft?.data) return;
    setShowDrafts(false);
    setInstructionDetails(draft.data.instructionDetails || instructionDetails);
    setRows(draft.data.rows?.length ? draft.data.rows : rows);
  };

  //page calculations
  const totalPages = Math.max(1, Math.ceil(rows.length / ROWS_PER_PAGE));
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const currentRows = rows.slice(startIndex, endIndex);
  const canAddMore = rows.length < 100; 

  // Update instruction details
  const updateInstructionDetails = (field, value) => {
    setInstructionDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user updates field
    if (errors.instruction[field]) {
      setErrors(prev => ({
        ...prev,
        instruction: {
          ...prev.instruction,
          [field]: ''
        }
      }));
    }
  };

  // Update a  row
  const updateRow = (displayIndex, field, value) => {
    const actualIndex = startIndex + displayIndex;
    const newRows = [...rows];
    newRows[actualIndex] = {
      ...newRows[actualIndex],
      [field]: value
    };
    setRows(newRows);
    
    // Clear error once field updates
    if (errors.rows[actualIndex] && errors.rows[actualIndex][field]) {
      const newErrors = [...errors.rows];
      newErrors[actualIndex] = {
        ...newErrors[actualIndex],
        [field]: ''
      };
      setErrors(prev => ({
        ...prev,
        rows: newErrors
      }));
    }
  };

  // Add new row
  const addRow = () => {
    if (canAddMore) {
      const newRow = {
        paymentMethod: '',
        payeeDetails: '',
        payeeNature: '',
        bankDetails: '',
        yourReference: '',
        paymentReference: '',
        amount: '',
        notesToPayee: '',
        additionalNotes: ''
      };
      setRows([...rows, newRow]);
      
      // Navigate to the page with the new row
      const newTotalPages = Math.ceil((rows.length + 1) / ROWS_PER_PAGE);
      setCurrentPage(newTotalPages);
    }
  };

  // Remove row
  const removeRow = (displayIndex) => {
    if (rows.length > 1) {
      const actualIndex = startIndex + displayIndex;
      const newRows = rows.filter((_, index) => index !== actualIndex);
      setRows(newRows);
  
      const newErrorRows = errors.rows.filter((_, index) => index !== actualIndex);
      setErrors(prev => ({
        ...prev,
        rows: newErrorRows
      }));

      // Adjust current page if necessary
      const newTotalPages = Math.max(1, Math.ceil(newRows.length / ROWS_PER_PAGE));
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      instruction: {},
      rows: []
    };

    // Validate instruction details
    if (!instructionDetails.paymentCurrency) {
      newErrors.instruction.paymentCurrency = 'Payment currency is required';
    }
    if (!instructionDetails.debitAccount) {
      newErrors.instruction.debitAccount = 'Debit account is required';
    }
    if (!instructionDetails.valueDate) {
      newErrors.instruction.valueDate = 'Value date is required';
    } else if (new Date(instructionDetails.valueDate) < new Date()) {
      newErrors.instruction.valueDate = 'Value date must be today or later';
    }

    // Validate rows
    rows.forEach((row, index) => {
      const rowErrors = {};
      
      if (!row.paymentMethod) rowErrors.paymentMethod = 'Required';
      if (!row.payeeDetails) rowErrors.payeeDetails = 'Required';
      if (!row.payeeNature) rowErrors.payeeNature = 'Required';
      if (!row.bankDetails) rowErrors.bankDetails = 'Required';
      if (!row.yourReference) rowErrors.yourReference = 'Required';
      if (!row.paymentReference) rowErrors.paymentReference = 'Required';
      if (!row.amount) {
        rowErrors.amount = 'Required';
      } else if (parseFloat(row.amount) <= 0) {
        rowErrors.amount = 'Amount must be positive';
      }

      newErrors.rows[index] = rowErrors;
    });

    setErrors(newErrors);
    return Object.keys(newErrors.instruction).length === 0 && 
           newErrors.rows.every(rowError => Object.keys(rowError).length === 0);
  };

  // Save draft
const handleDraft = () => {
     if (!validateForm()) {
    // If validation fails, do not save draft
    return;
  }
 
  const draft = {
    id: Date.now().toString(),
    name: instructionDetails.paymentReference || "Untitled Draft",
    debitAccount: instructionDetails.debitAccount,
    status: "draft",
    currency: instructionDetails.paymentCurrency,
    totalAmount: rows.reduce((sum, row) => sum + Number(row.amount || 0), 0),
    paymentCount: rows.length,
    createdDate: new Date().toLocaleDateString(),
    lastModified: new Date().toLocaleDateString(),
    data: {
      instructionDetails,
      rows,
    },
  };
  saveDraftToStorage(draft);
  setShowDrafts(true); // Show the drafts screen
};
  // Submit transaction
  const submitTransaction = () => {
    if (validateForm()) {
      const totalAmount = rows.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0);
      const confirmation = window.confirm(
        `Are you sure you want to submit ${rows.length} payment(s) with total amount of ${totalAmount.toFixed(2)} ${instructionDetails.paymentCurrency}?`
      );
      
      if (confirmation) {
        alert('Payment instructions submitted successfully! Transaction ID: TXN' + Math.random().toString(36).substr(2, 9).toUpperCase());
      }
    }
  };

  // Calculate current row errors for display
  const currentRowErrors = currentRows.map((_, displayIndex) => {
    const actualIndex = startIndex + displayIndex;
    return errors.rows[actualIndex] || {};
  });

 return (
  <div className="min-vh-100 bg-light">
  
<<<<<<< HEAD
    {!showDrafts && <Header />}
=======
   
>>>>>>> d158b42 (merged and routed paymentform to dashboard)

    {showDrafts ? (
  
      <DraftManagement
        onEditDraft={handleEditDraft}
        onBackToCreate={() => setShowDrafts(false)}
      />
    ) : (
  
      <div className="container-fluid px-4">
        <div className="mb-4 mt-3">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h2 fw-bold text-dark mb-0">
              Create Payment Instructions
            </h1>
            <button
              onClick={() => setShowDrafts(true)}
              className="btn btn-outline-primary d-flex align-items-center"
            >
              <FileText className="me-2" size={18} />
              View Drafts
            </button>
          </div>
          <p className="text-muted mt-2 mb-0">
            Set up your payment instructions with detailed beneficiary information
          </p>
        </div>

        <div className="mb-4">
          <InstructionDetails
            instructionDetails={instructionDetails}
            updateInstructionDetails={updateInstructionDetails}
            errors={errors.instruction}
          />
        </div>

        <div className="mb-4">
          <PaymentDetailsTable
            rows={currentRows}
            updateRow={updateRow}
            addRow={addRow}
            removeRow={removeRow}
            errors={currentRowErrors}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            canAddMore={canAddMore}
          />
        </div>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button
            onClick={handleDraft}
            className="btn btn-secondary d-inline-flex align-items-center px-4 py-2"
          >
            <Save className="me-2" style={{ width: '20px', height: '20px' }} />
            Save Draft
          </button>
          <button
            onClick={submitTransaction}
            className="btn btn-success d-inline-flex align-items-center px-4 py-2"
          >
            <Send className="me-2" style={{ width: '20px', height: '20px' }} />
            Submit Transaction
          </button>
        </div>
      </div>
    )}
  </div>
);
};
export default PaymentForm;