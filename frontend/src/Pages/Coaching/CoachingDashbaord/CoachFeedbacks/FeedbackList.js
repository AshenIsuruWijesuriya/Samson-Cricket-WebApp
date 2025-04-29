import React, { useEffect, useState } from "react";
import "./FeedbackList.css";
import CoachingHeader from "../../CoachingHeader/CoachingHeader";
import { FaTrash, FaCheck } from "react-icons/fa";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(stored.reverse());
  }, []);

  const handleDelete = (index) => {
    const updatedFeedbacks = [...feedbacks];
    updatedFeedbacks.splice(index, 1);
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
  };

  const handleMarkAsRead = (index) => {
    const updatedFeedbacks = [...feedbacks];
    updatedFeedbacks[index] = {
      ...updatedFeedbacks[index],
      isRead: true
    };
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
  };

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
              <div key={index} className={`coach-feedback-item ${f.isRead ? 'coach-feedback-read' : ''}`}>
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
                  <div className="coach-feedback-actions">
                    <button 
                      className="coach-feedback-mark-read"
                      onClick={() => handleMarkAsRead(index)}
                      disabled={f.isRead}
                    >
                      <FaCheck /> {f.isRead ? 'Read' : 'Mark as Read'}
                    </button>
                    <button 
                      className="coach-feedback-delete"
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
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
