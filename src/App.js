import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PaymentForm from "./components/PaymentForm";

export default function App() {
  const role = "creator"; // use "creator" to see the CREATE → Payroll submenu

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard role={role} />} />
        <Route path="/payroll" element={<PaymentForm />} />
      </Routes>
    </BrowserRouter>
  );
}