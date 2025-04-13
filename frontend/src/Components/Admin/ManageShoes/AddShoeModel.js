import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AddShoeModel.css";

const api = process.env.REACT_APP_BASE_URL;

const AddShoeModal = ({ onClose, onShoeAdded }) => {
  const [newShoe, setNewShoe] = useState({
    brand: "",
    model: "",
    size: "",
    color: "",
    price: "",
    description: "",
    images: [],
    stock: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    setNewShoe({ ...newShoe, [e.target.name]: e.target.value });
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
      !newShoe.brand ||
      !newShoe.model ||
      !newShoe.size ||
      !newShoe.color ||
      !newShoe.price ||
      !newShoe.stock ||
      !newShoe.category
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
      for (const key in newShoe) {
        if (key !== "images") {
          formData.append(key, newShoe[key]);
        }
      }

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }

      await axios.post(`${api}/api/shoes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Success!",
        text: "New shoe successfully added!",
        icon: "success",
        confirmButtonText: "OK",
      });
      onShoeAdded();
      onClose();
    } catch (error) {
      console.error(
        "Error adding shoe:",
        error.response?.data || error.message
      );
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

  const categories = ["Bowling", "Batting"];
  const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46];

  return (
    <div className="shoe-modal-overlay">
      <div className="shoe-modal-content">
        <h2 className="shoe-modal-title">Add New Shoe</h2>
        {error && <div className="shoe-modal-error">{error}</div>}
        <form className="shoe-modal-form" onSubmit={handleSubmit}>
          <input
            placeholder="Brand"
            name="brand"
            value={newShoe.brand}
            onChange={handleInputChange}
            className="shoe-modal-input"
          />
          <input
            placeholder="Model"
            name="model"
            value={newShoe.model}
            onChange={handleInputChange}
            className="shoe-modal-input"
          />
          <select
            placeholder="Category"
            name="category"
            value={newShoe.category}
            onChange={handleInputChange}
            className="shoe-modal-input"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            type="number"
            placeholder="Size"
            name="size"
            value={newShoe.size}
            onChange={handleInputChange}
            className="shoe-modal-input"
          >
            <option value="">Select Shoe Size</option>
            {sizes.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={newShoe.price}
            onChange={handleInputChange}
            className="shoe-modal-input"
          />
          <textarea
            placeholder="Description"
            name="description"
            value={newShoe.description}
            onChange={handleInputChange}
            className="shoe-modal-input"
          />
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={newShoe.stock}
            onChange={handleInputChange}
            className="shoe-modal-input"
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="shoe-modal-input"
          />
          <div className="shoe-modal-image-previews">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="shoe-modal-image-preview"
              />
            ))}
          </div>
          <div className="shoe-modal-actions">
            <button
              type="submit"
              className="shoe-modal-button shoe-modal-button-add"
            >
              Add Shoe
            </button>
            <button
              type="button"
              className="shoe-modal-button shoe-modal-button-cancel"
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

export default AddShoeModal;
