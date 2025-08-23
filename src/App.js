import React from "react";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaymentForm from "./components/PaymentForm";

export default function App() {
  const role = "creator"; // use "creator" to see the CREATE → Payroll submenu

  return (
    <PaymentForm/>
  );
}
=======
import Sidebar from "./Components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
// ✅ Make sure Bootstrap CSS is imported BEFORE your custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentDetailsTable from "./Components/PaymentDetailsTable";
import PaymentForm from "./Components/PaymentForm";

function App() {
  const role = "creator"; // try: creator | manager | approver

  return (
    <Router>
      <div className="app-layout">
        {/* ✅ Fixed: Pass the role prop to Sidebar */}
        <Sidebar role={role} />
        <div className="content">
  <div className="container d-flex justify-content-center">
    <div className="col-lg-10">
      <Routes>
        <Route path="/cash/create/payroll" element={<PaymentForm />} />
      </Routes>
    </div>
  </div>
</div>
      </div>
    </Router>
  );
}

export default App;
>>>>>>> d158b42 (merged and routed paymentform to dashboard)
