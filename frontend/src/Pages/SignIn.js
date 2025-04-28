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
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
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
      localStorage.setItem("userId", user.id);

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
          navigate("/");
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/api/auth/generate-otp`, { email: forgotPasswordEmail });
      setGeneratedOtp(response.data.otp);
      setShowForgotPasswordModal(false);
      setShowOtpModal(true);
      Swal.fire({
        title: "OTP Sent!",
        text: "Please check your email for the OTP",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Failed to send OTP. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setShowOtpModal(false);
      setShowResetPasswordModal(true);
    } else {
      Swal.fire({
        title: "Error",
        text: "Invalid OTP. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setOtp(""); // Clear the OTP input
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await axios.post(`${api}/api/users/update-password`, {
        email: forgotPasswordEmail,
        password: newPassword,
      });

      Swal.fire({
        title: "Success!",
        text: "Password updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setShowResetPasswordModal(false);
        setForgotPasswordEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Failed to update password. Please try again.",
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
            <button
              type="button"
              className="sign-in-page-forgot-link"
              onClick={() => setShowForgotPasswordModal(true)}
            >
              Forgot Password?
            </button>
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

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <h2>Reset Password</h2>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
                className="sign-in-page-input"
              />
              <button type="submit" className="sign-in-page-button">
                Send OTP
              </button>
              <button
                type="button"
                className="sign-in-page-button"
                onClick={() => setShowForgotPasswordModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <h2>Verify OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="sign-in-page-input"
            />
            <button onClick={handleVerifyOtp} className="sign-in-page-button">
              Verify
            </button>
            <button
              type="button"
              className="sign-in-page-button"
              onClick={() => setShowOtpModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="sign-in-page-input"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="sign-in-page-input"
              />
              <button type="submit" className="sign-in-page-button">
                Update Password
              </button>
              <button
                type="button"
                className="sign-in-page-button"
                onClick={() => setShowResetPasswordModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <MainFooter />
    </div>
  );
};

export default SignIn;