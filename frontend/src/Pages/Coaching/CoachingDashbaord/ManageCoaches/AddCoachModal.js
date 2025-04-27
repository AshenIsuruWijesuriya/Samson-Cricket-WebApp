import React, { useState } from "react";
import axios from "axios";
import "./AddCoachModal.css";

const AddCoachModal = ({ onClose, onCoachAdded }) => {
  const api = process.env.REACT_APP_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    experience: "",
    status: "available",
    coachType: [],
    description: "",
  });

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const validateForm = () => {
    const { name, email, contactNumber, experience, description } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name.trim() || !email.trim() || !contactNumber.trim() || !experience.trim()) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return false;
    }
    if (!phoneRegex.test(contactNumber)) {
      setError("Contact number must be 10 digits.");
      return false;
    }
    if (formData.coachType.length === 0) {
      setError("Please select at least one coach type.");
      return false;
    }
    if (description.length > 500) {
      setError("Description should be under 500 characters.");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const types = prev.coachType.includes(value)
          ? prev.coachType.filter((t) => t !== value)
          : [...prev.coachType, value];
        return { ...prev, coachType: types };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => payload.append(key, v));
      } else {
        payload.append(key, value);
      }
    });

    images.forEach((img) => {
      payload.append("images", img);
    });

    try {
      await axios.post(`${api}/api/coach`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onCoachAdded();
      onClose();
    } catch (err) {
      console.error("Error adding coach:", err);
      setError(err.response?.data?.message || "Failed to add coach.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Coach</h2>
        <form onSubmit={handleSubmit} className="coach-form">
          <label>
            Name:
            <input type="text" name="name" value={formData.name} required onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} required onChange={handleChange} />
          </label>
          <label>
            Contact Number:
            <input type="text" name="contactNumber" value={formData.contactNumber} required onChange={handleChange} />
          </label>
          <label>
            Experience:
            <input type="text" name="experience" value={formData.experience} required onChange={handleChange} />
          </label>
          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>
          <label>
            Coach Type:
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="coachType"
                  value="1 to 1 coaching"
                  checked={formData.coachType.includes("1 to 1 coaching")}
                  onChange={handleChange}
                />
                1 to 1 Coaching
              </label>
              <label>
                <input
                  type="checkbox"
                  name="coachType"
                  value="online coaching"
                  checked={formData.coachType.includes("online coaching")}
                  onChange={handleChange}
                />
                Online Coaching
              </label>
              <label>
                <input
                  type="checkbox"
                  name="coachType"
                  value="academic coaching"
                  checked={formData.coachType.includes("academic coaching")}
                  onChange={handleChange}
                />
                Academic Coaching
              </label>
            </div>
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </label>
          <label>
            Upload Images:
            <input type="file" multiple accept="image/*" onChange={handleFileChange} />
          </label>
          {error && <p className="error-message">{error}</p>}
          <div className="modal-actions">
            <button type="submit">Add Coach</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoachModal;