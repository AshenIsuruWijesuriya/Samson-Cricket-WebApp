// UpdateMerchModal.js
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './UpdateMerchModal.css';

const UpdateMerchModal = ({ merch, onClose, onMerchUpdated }) => {
  const api = useMemo(() => process.env.REACT_APP_BASE_URL, []);

  const [updatedMerch, setUpdatedMerch] = useState({
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

  useEffect(() => {
    if (merch) {
      setUpdatedMerch({ ...merch });
      if (merch.images && merch.images.length > 0) {
        setImagePreviews(merch.images.map((image) => `${api}/uploads/${image}`));
      }
    }
  }, [merch, api]);

  const handleInputChange = (e) => {
    setUpdatedMerch({ ...updatedMerch, [e.target.name]: e.target.value });
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
      !updatedMerch.name ||
      !updatedMerch.category ||
      !updatedMerch.brand ||
      !updatedMerch.size ||
      !updatedMerch.price ||
      !updatedMerch.stock
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
      for (const key in updatedMerch) {
        if (key !== 'images') {
          formData.append(key, updatedMerch[key]);
        }
      }

      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('images', selectedFiles[i]);
        }
      } else if (merch.images && merch.images.length > 0) {
        merch.images.forEach((image) => {
          formData.append('existingImages', image);
        });
      }

      await axios.put(`${api}/api/merch/${merch._id}`, formData, {});

      Swal.fire({
        title: 'Success!',
        text: 'Merchandise successfully updated!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      onMerchUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating merchandise:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="merch-modal-overlay">
      <div className="merch-modal-content">
        <h2 className="merch-modal-title">Update Merchandise</h2>
        {error && <div className="merch-modal-error">{error}</div>}
        <form className="merch-modal-form" onSubmit={handleSubmit}>
          <input placeholder="Name" name="name" value={updatedMerch.name} onChange={handleInputChange} className="merch-modal-input" />
          <input placeholder="Category" name="category" value={updatedMerch.category} onChange={handleInputChange} className="merch-modal-input" />
          <input placeholder="Brand" name="brand" value={updatedMerch.brand} onChange={handleInputChange} className="merch-modal-input" />
          <input placeholder="Size" name="size" value={updatedMerch.size} onChange={handleInputChange} className="merch-modal-input" />
          <input type="number" placeholder="Price" name="price" value={updatedMerch.price} onChange={handleInputChange} className="merch-modal-input" />
          <textarea placeholder="Description" name="description" value={updatedMerch.description} onChange={handleInputChange} className="merch-modal-input" />
          <input type="number" placeholder="Stock" name="stock" value={updatedMerch.stock} onChange={handleInputChange} className="merch-modal-input" />
          <input type="file" name="images" multiple onChange={handleFileChange} className="merch-modal-input" />
          <div className="merch-modal-image-previews">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview ${index}`} className="merch-modal-image-preview" />
            ))}
          </div>
          <div className="merch-modal-actions">
            <button type="submit" className="merch-modal-button merch-modal-button-add">Update Merchandise</button>
            <button type="button" className="merch-modal-button merch-modal-button-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMerchModal;