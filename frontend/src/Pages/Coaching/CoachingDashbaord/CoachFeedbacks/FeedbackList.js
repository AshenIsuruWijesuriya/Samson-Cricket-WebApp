import React, { useEffect, useState } from "react";
import "./FeedbackList.css";
import CoachingHeader from "../../CoachingHeader/CoachingHeader";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(stored.reverse());
  }, []);

  return (
    <>
      <CoachingHeader />
      <div className="coach-feedback-list-container">
        <h2 className="coach-feedback-list-title">User Feedback</h2>
        {feedbacks.length === 0 ? (
          <p className="coach-feedback-empty">No feedback available.</p>
        ) : (
          <div className="coach-feedback-list">
            {feedbacks.map((f, index) => (
              <div key={index} className="coach-feedback-item">
                <div className="coach-feedback-header">
                  <div className="coach-feedback-user">
                    <strong className="coach-feedback-name">{f.name}</strong>
                    <span className="coach-feedback-email">({f.email})</span>
                  </div>
                  <div className="coach-feedback-coach">
                    <span className="coach-feedback-coach-label">Coach:</span>
                    <span className="coach-feedback-coach-name">{f.coachName}</span>
                  </div>
                </div>
                <div className="coach-feedback-message">{f.message}</div>
                <div className="coach-feedback-footer">
                  <small className="coach-feedback-date">
                    {new Date(f.createdAt).toLocaleString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackList;
