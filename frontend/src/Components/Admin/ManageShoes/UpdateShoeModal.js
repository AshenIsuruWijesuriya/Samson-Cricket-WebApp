import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './UpdateShoeModal.css'; // Create a new CSS file for the shoe modal

const UpdateShoeModal = ({ shoe, onClose, onShoeUpdated }) => {
  const api = useMemo(() => process.env.REACT_APP_BASE_URL, []);

  const [updatedShoe, setUpdatedShoe] = useState({
    brand: '',
    model: '',
    size: 0,
    price: 0,
    description: '',
    images: [],
    stock: 0,
    category: '',
  });
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (shoe) {
      setUpdatedShoe({ ...shoe });
      if (shoe.images && shoe.images.length > 0) {
        setImagePreviews(shoe.images.map((image) => `${api}/uploads/${image}`));
      }
    }
  }, [shoe, api]);

  const handleInputChange = (e) => {
    setUpdatedShoe({ ...updatedShoe, [e.target.name]: e.target.value });
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
      !updatedShoe.brand ||
      !updatedShoe.model ||
      !updatedShoe.size ||
      !updatedShoe.price ||
      !updatedShoe.description ||
      !updatedShoe.stock ||
      !updatedShoe.category
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
      for (const key in updatedShoe) {
        if (key !== 'images') {
          formData.append(key, updatedShoe[key]);
        }
      }

      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('images', selectedFiles[i]);
        }
      } else if (shoe.images && shoe.images.length > 0) {
        shoe.images.forEach((image) => {
          formData.append('existingImages', image);
        });
      }

      await axios.put(`${api}/api/shoes/${shoe._id}`, formData, {});

      Swal.fire({
        title: 'Success!',
        text: 'Shoe successfully updated!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      onShoeUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating shoe:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

    const categories = ["Running", "Training", "Walking", "Basketball", "Soccer", "Other"];

  return (
    <div className="shoe-modal-overlay"> {/* Apply new CSS class */}
      <div className="shoe-modal-content"> {/* Apply new CSS class */}
        <h2 className="shoe-modal-title">Update Shoe</h2> {/* Apply new CSS class */}
        {error && <div className="shoe-modal-error">{error}</div>} {/* Apply new CSS class */}
        <form className="shoe-modal-form" onSubmit={handleSubmit}> {/* Apply new CSS class */}
          <input
            placeholder="Brand"
            name="brand"
            value={updatedShoe.brand}
            onChange={handleInputChange}
            className="shoe-modal-input" // Apply new CSS class
          />
          <input
            placeholder="Model"
            name="model"
            value={updatedShoe.model}
            onChange={handleInputChange}
            className="shoe-modal-input" // Apply new CSS class
          />
          <select
            placeholder="Category"
            name="category"
            value={updatedShoe.category}
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
          <input
            type="number"
            placeholder="Size"
            name="size"
            value={updatedShoe.size}
            onChange={handleInputChange}
            className="shoe-modal-input" // Apply new CSS class
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={updatedShoe.price}
            onChange={handleInputChange}
            className="shoe-modal-input" // Apply new CSS class
          />
          <textarea
            placeholder="Description"
            name="description"
            value={updatedShoe.description}
            onChange={handleInputChange}
            className="shoe-modal-input" // Apply new CSS class
          />
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={updatedShoe.stock}
            onChange={handleInputChange}
            className="shoe-modal-input" // Apply new CSS class
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="shoe-modal-input" // Apply new CSS class
          />
          <div className="shoe-modal-image-previews">  {/* Apply new CSS class */}
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="shoe-modal-image-preview" // Apply new CSS class
              />
            ))}
          </div>
          <div className="shoe-modal-actions"> {/* Apply new CSS class */}
            <button
              type="submit"
              className="shoe-modal-button shoe-modal-button-add" // Apply new CSS class
            >
              Update Shoe
            </button>
            <button
              type="button"
              className="shoe-modal-button shoe-modal-button-cancel" // Apply new CSS class
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

export default UpdateShoeModal;
