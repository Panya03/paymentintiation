import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Dashboard.module.css";

import { FaHome, FaUsersCog, FaPlusCircle, FaChartBar, FaCheckSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Dashboard({ role }) {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "home",
      label: "HOME",
      icon: <FaHome />,
      roles: ["operator", "creator", "approver"],
    },
    {
      key: "manageUsers",
      label: "MANAGE",
      icon: <FaUsersCog />,
      roles: ["operator"],
      subMenu: [
        { label: "Users" },
        { label: "Profile Settings" },
        { label: "Add Approvers" },
        { label: "View Transactions" },
      ],
    },
    {
      key: "createTransaction",
      label: "CREATE",
      icon: <FaPlusCircle />,
      roles: ["creator"],
      subMenu: [
        { label: "Payroll", path: "/payroll" }, // routes to PaymentForm
        { label: "Profile Settings" },
        { label: "Approvals" },
        { label: "View Transactions" },
      ],
    },
    {
      key: "approvePayments",
      label: "APPROVE",
      icon: <FaCheckSquare />,
      roles: ["approver"],
      subMenu: [
        { label: "Approvals" },
        { label: "Profile Settings" },
        { label: "View Transactions" },
      ],
    },
    {
      key: "reports",
      label: "REPORTS",
      icon: <FaChartBar />,
      roles: ["operator", "creator", "approver"],
      subMenu: [
        { label: "View Transactions" },
        { label: "Download e-statement" },
      ],
    },
  ];

  const renderHome = () => (
    <div className="container-fluid">
      <div className="nav"></div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className={`card gradient-card shadow-sm text-white ${styles.dashCard}`}>
            <div className={`card-body ${styles.dashCardBody}`}>
              <h5 className="card-title">Account Balance</h5>
              {showBalance ? <h3>₹ 2,00,45,000</h3> : <h3> </h3>}
              <button
                className={`b btn btn-light btn-sm mt-2 ${styles.dashButton}`}
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? "Close Balance" : "View Balance"}
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={`card gradient-card-2 shadow-sm text-white ${styles.dashCard}`}>
            <div className={`card-body ${styles.dashCardBody}`}>
              <h5 className="card-title">Approval Status</h5>
              <h3>5 Pending</h3>
              <button className={`b btn btn-light btn-sm mt-2 ${styles.dashButton}`}>Approve</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={`card gradient-card-3 shadow-sm text-white ${styles.dashCard}`}>
            <div className={`card-body ${styles.dashCardBody}`}>
              <h5 className="card-title">Transactions Today</h5>
              <h3>23</h3>
              <button className={`b btn btn-light btn-sm mt-2 ${styles.dashButton}`}>Transactions</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className={`card-header text-white d-flex justify-content-between align-items-center ${styles.cardHeader}`}>
          <span>Transaction History</span>
          <button className={`Q btn btn-sm ${styles.downloadBtn}`}> Download History</button>
        </div>

        {/* give the table a white panel + padding for contrast */}
        <div className={`table-responsive ${styles.tableWrap}`}>
          <table className={`table modern-service-table mb-0 align-items-center ${styles.modernServiceTable}`}>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Reference ID</th>
                <th>Total Amount</th>
                <th>Number of Employees</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>14 Aug 2025</td>
                <td>TNX123t56</td>
                <td>15,00,000</td>
                <td>
                  <pre>    20</pre>
                </td>
                <td>
                  <span className="badge bg-light text-dark">Rolled</span>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td>14 Aug 2025</td>
                <td>HG123T106</td>
                <td>12,34,012</td>
                <td>
                  <pre>    27</pre>
                </td>
                <td>
                  <span className="badge bg-light text-dark">Rolled</span>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>13 Aug 2025</td>
                <td>RE33310Y6</td>
                <td>2,00,000</td>
                <td>
                  <pre>    4</pre>
                </td>
                <td>
                  <span className="badge bg-light text-dark">Rolled</span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    const menu = menuItems.find((item) => item.key === selectedMenu);
    if (!menu || !menu.roles.includes(role)) {
      return <div className="alert alert-danger">You are restricted</div>;
    }
    if (menu.key === "home") return renderHome();
    return (
      <div className="p-3">
        <h4>{menu.label}</h4>
        <p>Content for {menu.label}</p>
      </div>
    );
  };

  return (
    <div className={`d-flex dashboard-container ${styles.dashboardContainer}`}>
      <div className={`bar text-white p-3 ${styles.sidebar}`}>
        <img className={`logo ${styles.logo}`} src="/sc-Photoroom.png" alt="none" />
        <span className={`brand-name text-light ${styles.brandName}`}>Straight2Bank</span>

        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`content btn w-100 mb-2 text-light text-start ${selectedMenu === item.key ? "active" : ""} ${styles.menuItem}`}
            onClick={() => setSelectedMenu(item.key)}
            onMouseEnter={() => setHoveredMenu(item.key)}
            onMouseLeave={() => setHoveredMenu(null)}
            style={{ position: "relative" }}
          >
            <span className="me-2">{item.icon}</span>
            {item.label}

            {hoveredMenu === item.key && item.subMenu && (
              <div className={`submenu shadow-sm ${styles.submenu}`}>
                {item.subMenu.map((sub, idx) => (
                  <button
                    key={idx}
                    className={`submenu-item btn btn-link text-start w-100 ${styles.submenuItem}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (sub.path) navigate(sub.path);
                    }}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex-grow-1 d-flex flex-column">
        <nav className={`px-3 d-flex justify-content-between align-items-center ${styles.topNav}`}>
          <div className={`userprofile text-light ${styles.userprofile}`}>
            <img className={`logo2 ${styles.logo2}`} src="/user.png" alt="none" /> SCB0334
          </div>
          <img className={`logo1 ${styles.logo1}`} src="/Logout.jpg" alt="none" />
        </nav>

        <div className="flex-grow-1 p-4 bg-light">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
