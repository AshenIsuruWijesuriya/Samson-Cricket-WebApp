import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import MainHeader from '../../Common/mainHeader';
import MainFooter from '../../Common/mainFooter';
import Swal from 'sweetalert2';
import './Community.css';

const Community = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const api = process.env.REACT_APP_BASE_URL;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [formError, setFormError] = useState('');
    const [, setUserEmail] = useState(''); // State to store user email (not directly used in rendering the list)

    // Fetch feedbacks from the server
    const fetchFeedbacks = async () => {
        try {
            if (!api) {
                throw new Error("REACT_APP_BASE_URL is not defined. Check your .env file!");
            }
            const url = `${api}/api/feedback`;
            console.log('Fetching from:', url);
            const response = await fetch(url);
            if (!response.ok) {
                const text = await response.text();
                console.error('Fetch failed with status:', response.status, 'Response text:', text);
                throw new Error(`Failed to fetch feedbacks: ${response.status} - ${text}`);
            }
            const data = await response.json();
            console.log('Fetched data:', data);
            setFeedbacks(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
            setError(error);
            setLoading(false);
        }
    };

    // Fetch user data (keeping this for submitting feedback)
    const fetchUser = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return {
                    id: decoded.id,
                    name: 'Test User', // You might fetch this from your backend
                    email: decoded.email, // Extract email from the token
                };
            } catch (e) {
                console.error("Token decoding error", e);
                return null;
            }
        }
        return null;
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchFeedbacks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle feedback submission
    const handleSubmitFeedback = async () => {
        if (!feedbackType || !subject || !message) {
            setFormError('Please fill in all fields.');
            return;
        }
        setFormError('');

        try {
            const user = fetchUser(); // Get user info
            if (!user) {
                Swal.fire({
                    icon: 'info',
                    title: 'Please Log In',
                    text: 'You need to be logged in to submit feedback.',
                    confirmButtonText: 'OK',
                }).then(() => {
                    window.location.href = '/signin';
                });
                return;
            }

            const token = localStorage.getItem('token');
            setUserEmail(user.email); // store user email

            const response = await fetch(`${api}/api/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user.id,
                    feedbackType,
                    subject,
                    message,
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    Swal.fire({
                        icon: 'warning',
                        title: 'Session Expired',
                        text: 'Your session has expired. Please log in again.',
                    }).then(() => {
                        window.location.href = '/signin';
                    });
                    return;
                }
                const errorText = await response.text();
                console.error("Feedback submission failed:", response.status, errorText);
                throw new Error(`Failed to submit feedback: ${response.status} - ${errorText}`);
            }

            const newFeedback = await response.json();
            setFeedbacks(prev => [{ ...newFeedback, userId: { email: user.email }, status: 'Closed' }, ...prev]); // Show email and set default status to Closed
            setIsDialogOpen(false);

            Swal.fire({
                title: 'Success!',
                text: 'Your feedback has been submitted.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Reset form
            setFeedbackType('');
            setSubject('');
            setMessage('');
        } catch (error) {
            setError(error.message);
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div>
            <MainHeader />
            <main className="community-page-content">
                <section className="feedback-section">
                    <div className="community-section-content">
                        <div className="feedback-header-container">
                            <h2 className="feedback-header">Community Feedback</h2>
                            <button
                                className="feedback-button"
                                onClick={() => {
                                    const user = fetchUser();
                                    if (!user) {
                                        Swal.fire({
                                            icon: 'info',
                                            title: 'Please Log In',
                                            text: 'You need to be logged in to give feedback.',
                                            confirmButtonText: 'OK',
                                        }).then(() => {
                                            window.location.href = '/signin';
                                        });
                                    } else {
                                        setIsDialogOpen(true);
                                    }
                                }}
                            >
                                Give Feedback
                            </button>

                            {/* Feedback Dialog */}
                            {isDialogOpen && (
                                <div className="feedback-dialog">
                                    <h3 className="dialog-title">Submit Feedback</h3>
                                    <p className="dialog-description">
                                        Share your thoughts, suggestions, or issues with the community.
                                    </p>
                                    <div className="form-group">
                                        <label htmlFor="type">Type</label>
                                        <select
                                            id="type"
                                            value={feedbackType}
                                            onChange={(e) => setFeedbackType(e.target.value)}
                                        >
                                            <option value="">Select a type</option>
                                            <option value="Bug Report">Bug Report</option>
                                            <option value="Feature Request">Feature Request</option>
                                            <option value="General Feedback">General Feedback</option>
                                            <option value="Praise">Praise</option>
                                            <option value="Complaint">Complaint</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            placeholder="Enter subject"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            placeholder="Enter your message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </div>
                                    {formError && <p className="error-message">{formError}</p>}
                                    <div className="dialog-footer">
                                        <button
                                            className="cancel-button"
                                            onClick={() => setIsDialogOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button className="submit-button" onClick={handleSubmitFeedback}>
                                            Submit Feedback
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Feedback List */}
                        {loading ? (
                            <div className="loading-indicator">Loading feedbacks...</div>
                        ) : error ? (
                            <div className="error-message">Error: {error.message}</div>
                        ) : feedbacks.length > 0 ? (
                            <div className="feedback-list">
                                {feedbacks
                                    .filter(feedback => feedback.status !== 'Closed') // Filter out closed feedbacks
                                    .map((feedback) => (
                                        <div key={feedback._id} className="feedback-item">
                                            <div className="feedback-header">
                                                <span className="feedback-type">{feedback.feedbackType}</span>
                                            </div>
                                            <h3 className="feedback-subject">{feedback.subject}</h3>
                                            <p className="feedback-message">{feedback.message}</p>
                                            {feedback.userId && feedback.userId.email && (
                                                <p className="feedback-user-name">
                                                    User: {feedback.userId.email}
                                                </p>
                                            )}
                                            <p className="feedback-date">
                                                Created At: {new Date(feedback.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="no-feedback">No feedback available.</div>
                        )}
                    </div>
                </section>
            </main>
            <MainFooter />
        </div>
    );
};

export default Community;
