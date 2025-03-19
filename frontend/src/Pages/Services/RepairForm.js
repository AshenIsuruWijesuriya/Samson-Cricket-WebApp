import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import "./RepairForm.css";

const api = process.env.REACT_APP_BASE_URL;

const RepairForm = ({ closeForm, onRepairRequestAdded }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        repairType: "",
        details: "",
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.phoneNumber || !formData.repairType || !formData.details) {
            Swal.fire({ title: 'Error!', text: 'All fields are required.', icon: 'error', confirmButtonText: 'OK' });
            return;
        }

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${api}/api/services/create-repair`, formData);
            console.log('Repair request submitted:', response.data);
            Swal.fire({ title: 'Success!', text: 'Repair request successfully submitted!', icon: 'success', confirmButtonText: 'OK' });
            if (onRepairRequestAdded) {
                onRepairRequestAdded(response.data); // Pass the new request data
            }
            closeForm();
        } catch (error) {
            console.error('Error submitting repair request:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
            Swal.fire({ title: 'Error!', text: error.response?.data?.message || 'An error occurred. Please try again.', icon: 'error', confirmButtonText: 'OK' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="repair-form-overlay">
            <div className="repair-form">
                <h2>Request a Bat Repair</h2>
                {error && <div className="repair-form-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />

                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                    />

                    <label>Repair Type:</label>
                    <select
                        name="repairType"
                        value={formData.repairType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Repair Type</option>
                        <option>Handle Replacement</option>
                        <option>Crack Sealing</option>
                        <option>Weight Adjustment</option>
                        <option>General Clean-Up</option>
                        <option>Grip & Sticker Replacement</option>
                    </select>

                    <label>Additional Details:</label>
                    <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="Describe the issue in detail"
                        required
                    ></textarea>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                </form>

                <button className="close-btn" onClick={closeForm}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default RepairForm;