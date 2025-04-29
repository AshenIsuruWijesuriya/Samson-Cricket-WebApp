import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedbackForm.css";
import MainHeader from "../../../../Common/mainHeader";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({ 
    name: "", 
    email: "", 
    message: "",
    coachId: "" 
  });
  const [coaches, setCoaches] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const api = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userId = localStorage.getItem("userId");
        if (userId) {
          const userRes = await axios.get(`${api}/api/users/${userId}`);
          const user = userRes.data;
          setFeedback(prev => ({
            ...prev,
            name: user.firstname + " " + user.lastname,
            email: user.email,
          }));
        }

        // Fetch coaches data
        const coachesRes = await axios.get(`${api}/api/coach`);
        setCoaches(coachesRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [api]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = { 
      ...feedback, 
      createdAt: new Date().toISOString(),
      coachName: coaches.find(c => c._id === feedback.coachId)?.name || "Unknown Coach"
    };

    const existing = JSON.parse(localStorage.getItem("feedbacks")) || [];
    existing.push(newFeedback);
    localStorage.setItem("feedbacks", JSON.stringify(existing));

    setSubmitted(true);
  };

  return (
    <>
      <MainHeader />
      <div className="coach-feedback-container">
        <h2 className="coach-feedback-title">Leave Your Feedback</h2>
        {submitted ? (
          <p className="coach-feedback-success">Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit} className="coach-feedback-form">
            <div className="coach-feedback-field-group">
              <label className="coach-feedback-label">Your Name</label>
              <input
                type="text"
                name="name"
                value={feedback.name}
                className="coach-feedback-input"
                disabled
              />
            </div>
            <div className="coach-feedback-field-group">
              <label className="coach-feedback-label">Your Email</label>
              <input
                type="email"
                name="email"
                value={feedback.email}
                className="coach-feedback-input"
                disabled
              />
            </div>
            <div className="coach-feedback-field-group">
              <label className="coach-feedback-label">Select Coach</label>
              <select
                name="coachId"
                value={feedback.coachId}
                onChange={handleChange}
                required
                className="coach-feedback-select"
              >
                <option value="">Select a Coach</option>
                {coaches.map((coach) => (
                  <option key={coach._id} value={coach._id}>
                    {coach.name} - {coach.coachType.join(", ")}
                  </option>
                ))}
              </select>
            </div>
            <div className="coach-feedback-field-group">
              <label className="coach-feedback-label">Your Feedback</label>
              <textarea
                name="message"
                placeholder="Share your experience with the coach..."
                value={feedback.message}
                required
                onChange={handleChange}
                className="coach-feedback-textarea"
              ></textarea>
            </div>
            <button type="submit" className="coach-feedback-submit">Submit Feedback</button>
          </form>
        )}
      </div>
    </>
  );
};

export default FeedbackForm;