import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedbackForm.css";
import MainHeader from "../../../../Common/mainHeader";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const api = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await axios.get(`${api}/api/users/${userId}`);
        const user = res.data;
        setFeedback((prev) => ({
          ...prev,
          name: user.firstname + " " + user.lastname,
          email: user.email,
        }));
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUser();
  }, [api]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = { ...feedback, createdAt: new Date().toISOString() };

    const existing = JSON.parse(localStorage.getItem("feedbacks")) || [];
    existing.push(newFeedback);
    localStorage.setItem("feedbacks", JSON.stringify(existing));

    setSubmitted(true);
  };

  return (
    <>
    <MainHeader />
    <div className="feedback-form-container">
      <h2>Leave Your Feedback</h2>
      {submitted ? (
        <p className="feedback-success">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={feedback.name}
            placeholder="Your Name"
            disabled
          />
          <input
            type="email"
            name="email"
            value={feedback.email}
            placeholder="Your Email"
            disabled
          />
          <textarea
            name="message"
            placeholder="Your Feedback"
            value={feedback.message}
            required
            onChange={handleChange}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
    </>
  );
};

export default FeedbackForm;