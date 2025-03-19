import React from "react";
import "./RepairForm.css";

const RepairForm = ({ closeForm }) => {
  return (
    <div className="repair-form-overlay">
      <div className="repair-form">
        <h2>Request a Bat Repair</h2>
        <form>
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" required />

          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Phone Number:</label>
          <input type="tel" placeholder="Enter your phone number" required />

          <label>Repair Type:</label>
          <select required>
            <option value="">Select Repair Type</option>
            <option>Handle Replacement</option>
            <option>Crack Sealing</option>
            <option>Weight Adjustment</option>
            <option>General Clean-Up</option>
            <option>Grip & Sticker Replacement</option>
          </select>

          <label>Additional Details:</label>
          <textarea placeholder="Describe the issue in detail" required></textarea>

          <button type="submit">Submit Request</button>
        </form>

        {/* Close button correctly calls the function */}
        <button className="close-btn" onClick={closeForm}>Close</button>
      </div>
    </div>
  );
};

export default RepairForm;
