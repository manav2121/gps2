import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css"; // Add your custom styles here

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // You can add logic to authenticate the user here
    console.log("Email:", email);
    console.log("Password:", password);
    // On successful sign in, navigate to another page (e.g., home)
    navigate("/");
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
