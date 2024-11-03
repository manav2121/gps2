import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"; // Add your custom styles here

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // You can add logic to register the user here
      console.log("Email:", email);
      console.log("Password:", password);
      // On successful sign up, navigate to sign in page
      navigate("/sign-in");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
