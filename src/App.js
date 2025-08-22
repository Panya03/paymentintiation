import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaymentForm from "./components/PaymentForm";

export default function App() {
  const role = "creator"; // use "creator" to see the CREATE → Payroll submenu

  return (
    <PaymentForm/>
  );
}