// UpdateBatModal.js
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './UpdateBatModal.css';

const UpdateBatModal = ({ bat, onClose, onBatUpdated }) => {
  const api = useMemo(() => process.env.REACT_APP_BASE_URL, []); // Memoize the API URL

  const [updatedBat, setUpdatedBat] = useState({
    brand: '',
    model: '',
    woodType: '',
    grade: '',
    weight: '',
    price: 0,
    description: '',
    images: [],
    stock: 0,
  });
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (bat) {
      setUpdatedBat({ ...bat });
      if (bat.images && bat.images.length > 0) {
        setImagePreviews(bat.images.map((image) => `${api}/uploads/${image}`));
      }
    }
  }, [bat, api]); // api is now a dependency due to useMemo

  const handleInputChange = (e) => {
    setUpdatedBat({ ...updatedBat, [e.target.name]: e.target.value });
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
      !updatedBat.brand ||
      !updatedBat.model ||
      !updatedBat.woodType ||
      !updatedBat.grade ||
      !updatedBat.weight ||
      !updatedBat.price ||
      !updatedBat.stock
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
      for (const key in updatedBat) {
        if (key !== 'images') {
          formData.append(key, updatedBat[key]);
        }
      }

      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('images', selectedFiles[i]);
        }
      } else if (bat.images && bat.images.length > 0) {
        bat.images.forEach((image) => {
          formData.append('existingImages', image);
        });
      }

      await axios.put(`${api}/api/bats/${bat._id}`, formData, {});

      Swal.fire({
        title: 'Success!',
        text: 'Bat successfully updated!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      onBatUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating bat:', error.response?.data || error.message);
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
    <div className="bat-modal-overlay">
      <div className="bat-modal-content">
        <h2 className="bat-modal-title">Update Bat</h2>
        {error && <div className="bat-modal-error">{error}</div>}
        <form className="bat-modal-form" onSubmit={handleSubmit}>
          <input placeholder="Brand" name="brand" value={updatedBat.brand} onChange={handleInputChange} className="bat-modal-input" />
          <input placeholder="Model" name="model" value={updatedBat.model} onChange={handleInputChange} className="bat-modal-input" />
          <input placeholder="Wood Type" name="woodType" value={updatedBat.woodType} onChange={handleInputChange} className="bat-modal-input" />
          <input placeholder="Grade" name="grade" value={updatedBat.grade} onChange={handleInputChange} className="bat-modal-input" />
          <input placeholder="Weight" name="weight" value={updatedBat.weight} onChange={handleInputChange} className="bat-modal-input" />
          <input type="number" placeholder="Price" name="price" value={updatedBat.price} onChange={handleInputChange} className="bat-modal-input" />
          <textarea placeholder="Description" name="description" value={updatedBat.description} onChange={handleInputChange} className="bat-modal-input" />
          <input type="number" placeholder="Stock" name="stock" value={updatedBat.stock} onChange={handleInputChange} className="bat-modal-input" />
          <input type="file" name="images" multiple onChange={handleFileChange} className="bat-modal-input" />
          <div className="bat-modal-image-previews">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview ${index}`} className="bat-modal-image-preview" />
            ))}
          </div>
          <div className="bat-modal-actions">
            <button type="submit" className="bat-modal-button bat-modal-button-add">Update Bat</button>
            <button type="button" className="bat-modal-button bat-modal-button-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBatModal;