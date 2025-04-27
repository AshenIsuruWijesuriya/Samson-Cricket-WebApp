import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader/AdminHeader";
import "./ManageFeedback.css"; // Create a new CSS file for feedback management
import { FaTrash, FaEye, FaSort } from "react-icons/fa"; // Import FaSort here
import Swal from "sweetalert2";
import UpdateFeedbackModal from "./UpdateFeedbackModal"; // Create this modal component

const ManageFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [sortByDate, setSortByDate] = useState("desc");
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const api = process.env.REACT_APP_BASE_URL;

    const fetchFeedbacks = useCallback(async () => {
        try {
            const response = await axios.get(`${api}/api/feedback`);
            setFeedbacks(response.data);
            setFilteredFeedbacks(response.data);
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
            Swal.fire("Error!", "Failed to retrieve feedbacks.", "error");
        }
    }, [api]);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    useEffect(() => {
        let results = [...feedbacks];

        // Filter by search term (subject, message, user email, feedback type)
        if (searchTerm) {
            results = results.filter((feedback) => {
                const searchString = `${feedback.subject} ${feedback.message} ${feedback.userId?.email || ''} ${feedback.feedbackType} ${feedback.status}`.toLowerCase();
                return searchString.includes(searchTerm.toLowerCase());
            });
        }

        // Filter by status
        if (selectedStatus !== "all") {
            results = results.filter((feedback) => feedback.status === selectedStatus);
        }

        // Sort by date (createdAt)
        results.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortByDate === "desc" ? dateB - dateA : dateA - dateB;
        });

        setFilteredFeedbacks(results);
    }, [searchTerm, feedbacks, selectedStatus, sortByDate]);

    const handleDeleteFeedback = async (feedbackId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${api}/api/feedback/${feedbackId}`);
                    setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== feedbackId));
                    Swal.fire("Deleted!", "Feedback has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting feedback:", error);
                    Swal.fire("Error!", "Failed to delete feedback.", "error");
                }
            }
        });
    };

    const handleViewFeedback = (feedback) => {
        setSelectedFeedback(feedback);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedFeedback(null);
    };

    const handleFeedbackUpdated = () => {
        fetchFeedbacks();
    };

    const toggleSortByDate = () => {
        setSortByDate(sortByDate === "desc" ? "asc" : "desc");
    };

    return (
        <div className="manage-feedback-bg">
            <div className="manage-feedback-content">
                <AdminHeader />
                <div className="navigation-path-admindb">
                    <a href="/admindashboard">Admin Dashboard</a> / Manage Feedback
                </div>
                <h2 className="manage-feedback-title">Manage Feedback</h2>

                <div className="manage-feedback-filter-container">
                    <input
                        type="text"
                        placeholder="Search feedback..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="manage-feedback-search-input"
                    />
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="manage-feedback-status-filter"
                    >
                        <option value="all">All Statuses</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                    <button
                        onClick={toggleSortByDate}
                        className="manage-feedback-sort-button"
                        title={sortByDate === "desc" ? "Sort by Oldest First" : "Sort by Newest First"}
                    >
                        <FaSort /> {sortByDate === "desc" ? "Newest First" : "Oldest First"}
                    </button>
                </div>

                {isUpdateModalOpen && selectedFeedback && (
                    <UpdateFeedbackModal
                        feedback={selectedFeedback}
                        onClose={handleCloseUpdateModal}
                        onFeedbackUpdated={handleFeedbackUpdated}
                    />
                )}

                <table className="manage-feedback-table">
                    <thead className="manage-feedback-thead">
                        <tr className="manage-feedback-tr-header">
                            <th className="manage-feedback-th">Type</th>
                            <th className="manage-feedback-th">Subject</th>
                            <th className="manage-feedback-th">Message</th>
                            <th className="manage-feedback-th">User Email</th>
                            <th className="manage-feedback-th">Created At</th>
                            <th className="manage-feedback-th">Status</th>
                            <th className="manage-feedback-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="manage-feedback-tbody">
                        {filteredFeedbacks.map((feedback) => (
                            <tr key={feedback._id} className="manage-feedback-tr-data">
                                <td className="manage-feedback-td">{feedback.feedbackType}</td>
                                <td className="manage-feedback-td">{feedback.subject}</td>
                                <td className="manage-feedback-td">{feedback.message.substring(0, 100)}...</td> {/* Show a snippet */}
                                <td className="manage-feedback-td">{feedback.userId?.email || 'N/A'}</td>
                                <td className="manage-feedback-td">{new Date(feedback.createdAt).toLocaleString()}</td>
                                <td className="manage-feedback-td">{feedback.status}</td>
                                <td className="manage-feedback-td">
                                    <button className="manage-feedback-view-btn" onClick={() => handleViewFeedback(feedback)}>
                                        <FaEye /> View
                                    </button>
                                    <button className="manage-feedback-delete-btn" onClick={() => handleDeleteFeedback(feedback._id)}>
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageFeedback;