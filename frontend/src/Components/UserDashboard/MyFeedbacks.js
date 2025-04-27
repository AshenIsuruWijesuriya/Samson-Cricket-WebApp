import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './MyFeedbacks.css'; // Create a CSS file for Feedback component

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const api = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.id;

                fetch(`${api}/api/feedback/user/${userId}/feedback`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch your feedbacks');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setFeedbacks(data);
                    })
                    .catch((error) => {
                        console.error('Error fetching your feedbacks:', error);
                    });
            } catch (error) {
                console.error('Error decoding token or fetching feedbacks:', error);
            }
        }
    }, [api]);

    return (
        <div className="feedback-container">
            <h2>Your Feedbacks</h2>
            {feedbacks.length === 0 ? (
                <p>No feedback submitted yet.</p>
            ) : (
                <table className="feedback-table">
                    <thead>
                        <tr>
                            <th>Feedback Type</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback._id}>
                                <td>{feedback.feedbackType}</td>
                                <td>{feedback.subject}</td>
                                <td>{feedback.message}</td>
                                <td>{feedback.status}</td>
                                <td>{new Date(feedback.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Feedback;