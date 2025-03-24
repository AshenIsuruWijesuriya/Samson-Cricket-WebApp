import React, { useState } from "react";
import "./SignIn.css";
import MainHeader from "../Common/mainHeader";
import MainFooter from "../Common/mainFooter";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(api + "/api/users/login", {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id); // Store the user ID

      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back, " + user.firstname + "!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (user.role === "Admin") {
          navigate("/admindashboard");
        } else if (user.role === "Consultant") {
          navigate("/consultantdashboard");
        } else if (user.role === "ServiceManager") {
          navigate("/servicedashboard");
        } else if (user.role === "Coach") {
          navigate("/coachingdashboard");
        } else {
          navigate("/userdashboard");
        }
      });
    } catch (err) {
      Swal.fire({
        title: "Login Failed",
        text: err.response.data.message || "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="sign-in-page-container">
      <div className="sign-in-page-bg"></div>
      <MainHeader />
      <div className="sign-in-page-form-container">
        <h2 className="sign-in-page-title">
          Sign In to your Samson Cricket Account
        </h2>
        <form onSubmit={handleSubmit} className="sign-in-page-form">
          <div className="sign-in-page-input-group">
            <label htmlFor="email" className="sign-in-page-label"></label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="sign-in-page-input"
            />
          </div>
          <div className="sign-in-page-input-group">
            <label htmlFor="password" className="sign-in-page-label"></label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="sign-in-page-input"
            />
          </div>
          <div className="sign-in-page-forgot-password">
            <a href="/forgot-password" className="sign-in-page-forgot-link">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="sign-in-page-button">
            Sign In
          </button>
          <div className="sign-in-page-signup">
            <p className="sign-in-page-signup-text">Don't have an Account?</p>
            <a href="/signUp" className="sign-in-page-signup-link">
              Sign Up
            </a>
          </div>
        </form>
      </div>
      <MainFooter/>
    </div>
  );
};

export default SignIn;