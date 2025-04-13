// AddMerchModal.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddMerchModal.css';

const api = process.env.REACT_APP_BASE_URL;

const AddMerchModal = ({ onClose, onMerchAdded }) => {
  const [newMerch, setNewMerch] = useState({
    name: '',
    category: '',
    brand: '',
    size: '',
    price: 0,
    description: '',
    images: [],
    stock: 0,
  });
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    setNewMerch({ ...newMerch, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !newMerch.name ||
      !newMerch.category ||
      !newMerch.brand ||
      !newMerch.size ||
      !newMerch.price ||
      !newMerch.stock
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const formData = new FormData();
      for (const key in newMerch) {
        if (key !== 'images') {
          formData.append(key, newMerch[key]);
        }
      }

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('images', selectedFiles[i]);
      }

      await axios.post(`${api}/api/merch`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: 'Success!',
        text: 'New merchandise successfully added!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      onMerchAdded();
      onClose();
    } catch (error) {
      console.error('Error adding merchandise:', error.response?.data || error.message);
      setError(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
      Swal.fire({
        title: 'Error!',
        text:
          error.response?.data?.message || 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="merch-modal-overlay">
      <div className="merch-modal-content">
        <h2 className="merch-modal-title">Add New Merchandise</h2>
        {error && <div className="merch-modal-error">{error}</div>}
        <form className="merch-modal-form" onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            name="name"
            value={newMerch.name}
            onChange={handleInputChange}
            className="merch-modal-input"
          />
          <input
            placeholder="Category"
            name="category"
            value={newMerch.category}
            onChange={handleInputChange}
            className="merch-modal-input"
          />
          <input
            placeholder="Brand"
            name="brand"
            value={newMerch.brand}
            onChange={handleInputChange}
            className="merch-modal-input"
          />
          <input
            placeholder="Size"
            name="size"
            value={newMerch.size}
            onChange={handleInputChange}
            className="merch-modal-input"
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={newMerch.price}
            onChange={handleInputChange}
            className="merch-modal-input"
          />
          <textarea
            placeholder="Description"
            name="description"
            value={newMerch.description}
            onChange={handleInputChange}
            className="merch-modal-input"
          />
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={newMerch.stock}
            onChange={handleInputChange}
            className="merch-modal-input"
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="merch-modal-input"
          />
          <div className="merch-modal-image-previews">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="merch-modal-image-preview"
              />
            ))}
          </div>
          <div className="merch-modal-actions">
            <button type="submit" className="merch-modal-button merch-modal-button-add">
              Add Merchandise
            </button>
            <button
              type="button"
              className="merch-modal-button merch-modal-button-cancel"
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

export default AddMerchModal;