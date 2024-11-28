import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import RegisterForm from "./Components/Users/Forms/RegisterForm.js";
import Header from "./Components/Header/Header"; // Import the Header component
import Login from "./Components/Users/Forms/Login";
import Billing from "./Pages/Billing/Billing.js";



function App() {
  const [showOnlyCart, setShowOnlyCart] = useState(false);

  const handleOpenCart = () => {
    setShowOnlyCart(true); // Toggle to show only the Cart
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<Login/>} />
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/checkout" element={<Billing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
