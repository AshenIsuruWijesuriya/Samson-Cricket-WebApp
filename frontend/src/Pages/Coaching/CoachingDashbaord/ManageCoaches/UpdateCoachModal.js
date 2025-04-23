import React, { useState } from "react";
import axios from "axios";
import "./UpdateCoachModal.css";

const UpdateCoachModal = ({ coach, onClose, onCoachUpdated }) => {
  const api = process.env.REACT_APP_BASE_URL;

  const [formData, setFormData] = useState({
    name: coach.name,
    email: coach.email,
    contactNumber: coach.contactNumber,
    experience: coach.experience,
    status: coach.status,
    coachType: coach.coachType || [],
    description: coach.description,
  });

  const [existingImages, setExistingImages] = useState(coach.images || []);
  const [newImages, setNewImages] = useState([]);
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
    const { name, value, type} = e.target;

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
    setNewImages(Array.from(e.target.files));
  };

  const handleRemoveExistingImage = (filename) => {
    setExistingImages((prev) => prev.filter((img) => img !== filename));
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

    existingImages.forEach((img) => payload.append("existingImages", img));
    newImages.forEach((img) => payload.append("images", img));

    try {
      await axios.put(`${api}/api/coach/${coach._id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onCoachUpdated();
      onClose();
    } catch (err) {
      console.error("Error updating coach:", err);
      setError(err.response?.data?.message || "Failed to update coach.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Coach</h2>
        <form onSubmit={handleSubmit} className="coach-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
            />
          </label>
          <label>
            Contact Number:
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              required
              onChange={handleChange}
            />
          </label>
          <label>
            Experience:
            <input
              type="text"
              name="experience"
              value={formData.experience}
              required
              onChange={handleChange}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>
          <label>
            Coach Type:
            <div className="checkbox-group">
              {[
                "1 to 1 coaching",
                "online coaching",
                "academic coaching",
              ].map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    name="coachType"
                    value={type}
                    checked={formData.coachType.includes(type)}
                    onChange={handleChange}
                  />
                  {type}
                </label>
              ))}
            </div>
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </label>

          <label>
            Existing Images:
            <div className="existing-images">
              {existingImages.map((img, index) => (
                <div key={index} className="img-thumb">
                  <img src={`${api}/uploads/${img}`} alt="coach" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(img)}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          </label>

          <label>
            Upload New Images:
            <input type="file" multiple accept="image/*" onChange={handleFileChange} />
          </label>

          {error && <p className="error-message">{error}</p>}

          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoachModal;