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
    <div className="feedback-list-container">
      <h2>User Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul>
          {feedbacks.map((f, index) => (
            <li key={index} className="feedback-item">
              <strong>{f.name}</strong> ({f.email}) <br />
              <span>{f.message}</span><br />
              <small>{new Date(f.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default FeedbackList;
