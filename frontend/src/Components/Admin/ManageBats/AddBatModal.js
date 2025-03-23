import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AddBatModal.css";

const api = process.env.REACT_APP_BASE_URL;

const AddBatModal = ({ onClose, onBatAdded }) => {
  const [newBat, setNewBat] = useState({
    brand: "",
    model: "",
    woodType: "",
    grade: "",
    weight: "",
    price: "",
    description: "",
    images: [],
    stock: "",
  });
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]); // Added imagePreviews state

  const handleInputChange = (e) => {
    setNewBat({ ...newBat, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !newBat.brand ||
      !newBat.model ||
      !newBat.woodType ||
      !newBat.grade ||
      !newBat.weight ||
      !newBat.price ||
      !newBat.stock
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const formData = new FormData();
      for (const key in newBat) {
        if (key !== "images") {
          formData.append(key, newBat[key]);
        }
      }

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }

      await axios.post(`${api}/api/bats`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Success!",
        text: "New bat successfully added!",
        icon: "success",
        confirmButtonText: "OK",
      });
      onBatAdded();
      onClose();
    } catch (error) {
      console.error("Error adding bat:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const woodType = ["English Willow", "Kashmir Willow"];
  const grade = ["A", "B+", "B"];
  const brand = [
    "Gray Nicolls",
    "Kookaburra",
    "SS",
    "MRF",
    "SF",
    "SG",
    "New Balance",
    "GM",
    "Samson",
    "DSC",
  ];

  return (
    <div className="bat-modal-overlay">
      <div className="bat-modal-content">
        <h2 className="bat-modal-title">Add New Bat</h2>
        {error && <div className="bat-modal-error">{error}</div>}
        <form className="bat-modal-form" onSubmit={handleSubmit}>
          <select
            placeholder="Brand"
            name="brand"
            value={newBat.brand}
            onChange={handleInputChange}
            className="bat-modal-input"
          >
            <option value="">Select Bat Brand</option>
            {brand.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            placeholder="Model"
            name="model"
            value={newBat.model}
            onChange={handleInputChange}
            className="bat-modal-input"
          />
          <select
            placeholder="Wood Type"
            name="woodType"
            value={newBat.woodType}
            onChange={handleInputChange}
            className="bat-modal-input"
          >
            <option value="">Select Wood Type</option>
            {woodType.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            placeholder="Grade"
            name="grade"
            value={newBat.grade}
            onChange={handleInputChange}
            className="bat-modal-input"
          >
            <option value="">Select Bat Grade</option>
            {grade.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            placeholder="Weight"
            name="weight"
            value={newBat.weight}
            onChange={handleInputChange}
            className="bat-modal-input"
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={newBat.price}
            onChange={handleInputChange}
            className="bat-modal-input"
          />
          <textarea
            placeholder="Description"
            name="description"
            value={newBat.description}
            onChange={handleInputChange}
            className="bat-modal-input"
          />
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={newBat.stock}
            onChange={handleInputChange}
            className="bat-modal-input"
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="bat-modal-input"
          />
          <div className="bat-modal-image-previews">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="bat-modal-image-preview"
              />
            ))}
          </div>
          <div className="bat-modal-actions">
            <button
              type="submit"
              className="bat-modal-button bat-modal-button-add"
            >
              Add Bat
            </button>
            <button
              type="button"
              className="bat-modal-button bat-modal-button-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBatModal;
