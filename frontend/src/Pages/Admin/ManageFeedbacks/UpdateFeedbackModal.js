import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './UpdateFeedbackModal.css'; // Create this CSS file

const UpdateFeedbackModal = ({ feedback, onClose, onFeedbackUpdated }) => {
    const [status, setStatus] = useState(feedback.status);
    const api = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        setStatus(feedback.status);
    }, [feedback.status]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleUpdateFeedback = async () => {
        try {
            await axios.put(`${api}/api/feedback/${feedback._id}`, { status });
            Swal.fire('Updated!', 'Feedback status has been updated.', 'success');
            onFeedbackUpdated(); // Refresh the feedback list
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error updating feedback status:', error);
            Swal.fire('Error!', 'Failed to update feedback status.', 'error');
        }
    };

    return (
        <div className="update-feedback-modal-overlay">
            <div className="update-feedback-modal">
                <h2 className="update-feedback-modal-title">View/Update Feedback</h2>
                <div className="update-feedback-modal-content">
                    <p><strong>Type:</strong> {feedback.feedbackType}</p>
                    <p><strong>Subject:</strong> {feedback.subject}</p>
                    <p><strong>Message:</strong></p>
                    <div className="update-feedback-modal-message">
                        {feedback.message}
                    </div>
                    <p><strong>User Email:</strong> {feedback.userId?.email || 'N/A'}</p>
                    <p><strong>Created At:</strong> {new Date(feedback.createdAt).toLocaleString()}</p>

                    <div className="update-feedback-modal-status">
                        <label htmlFor="status">Status:</label>
                        <select id="status" value={status} onChange={handleStatusChange}>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                </div>
                <div className="update-feedback-modal-actions">
                    <button className="update-feedback-modal-save-btn" onClick={handleUpdateFeedback}>
                        Save Changes
                    </button>
                    <button className="update-feedback-modal-cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateFeedbackModal;