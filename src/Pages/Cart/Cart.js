import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header"; // Correct path to Header
import "./Cart.css"; // Custom styles here

const Cart = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const cartCount = parseInt(localStorage.getItem("cartCount") || "0", 10);
  const totalPrice = parseInt(localStorage.getItem("totalPrice") || "0", 10);

  const handleCheckout = () => {
    // Navigate to checkout page (update the path accordingly)
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      

      <h1>Your Order Summary</h1>

      {cartCount > 0 ? (
        <div className="order-summary">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>R.O Water (20L)</td>
                <td>{cartCount}</td>
                <td>Rs. {totalPrice}</td>
              </tr>
            </tbody>
          </table>
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}

      <Link to="/" className="home-button">Return to Home</Link>
    </div>
  );
};

export default Cart;
