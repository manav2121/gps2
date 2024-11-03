import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Header from "./Components/Header/Header"; // Import the Header component


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
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
