import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddGearModal.css';

const api = process.env.REACT_APP_BASE_URL;

const AddGearModal = ({ onClose, onGearAdded }) => {
    const [newGear, setNewGear] = useState({
        category: '',
        brand: '',
        model: '',
        specialType: '',
        sizeType: '',
        price: 0,
        description: '',
        images: [],
        stock: 0,
    });
    const [error, setError] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleInputChange = (e) => {
        setNewGear({ ...newGear, [e.target.name]: e.target.value });
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
            !newGear.category ||
            !newGear.brand ||
            !newGear.model ||
            !newGear.sizeType ||
            !newGear.price ||
            !newGear.stock
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
            for (const key in newGear) {
                if (key !== 'images') {
                    formData.append(key, newGear[key]);
                }
            }
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]);
            }

            await axios.post(`${api}/api/protection`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Swal.fire({
                title: 'Success!',
                text: 'New gear successfully added!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
            onGearAdded();
            onClose();
        } catch (error) {
            console.error('Error adding gear:', error.response?.data || error.message);
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

    const categoryOptions = [
        'Helmet',
        'Batting Pads',
        'Wicket Keeping Pads',
        'Gloves',
        'Bowl Guard',
        'Tie Pads',
        'Arm Guard'
    ];
    const specialTypeOptions = ['Left Handed', 'Right Handed'];
    const sizeTypeOptions = ['Junior', 'Adult'];

    return (
        <div className="gear-modal-overlay">
            <div className="gear-modal-content">
                <h2 className="gear-modal-title">Add New Gear</h2>
                {error && <div className="gear-modal-error">{error}</div>}
                <form className="gear-modal-form" onSubmit={handleSubmit}>
                    <select
                        name="category"
                        value={newGear.category}
                        onChange={handleInputChange}
                        className="gear-modal-input"
                    >
                        <option value="">Select Category</option>
                        {categoryOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <input
                        placeholder="Brand"
                        name="brand"
                        value={newGear.brand}
                        onChange={handleInputChange}
                        className="gear-modal-input"
                    />
                    <input
                        placeholder="Model"
                        name="model"
                        value={newGear.model}
                        onChange={handleInputChange}
                        className="gear-modal-input"
                    />
                    <select
                        name="specialType"
                        value={newGear.specialType}
                        onChange={handleInputChange}
                        className="gear-modal-input"
                    >
                        <option value="">Select Special Type</option>
                        {specialTypeOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <select
                        name="sizeType"
                        value={newGear.sizeType}
                        onChange={handleInputChange}
                        className="gear-modal-input"
                    >
                        <option value="">Select Size Type</option>
                        {sizeTypeOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={newGear.price}
                        onChange={handleInputChange}
                        className="gear-modal-input"
                    />
                    <textarea
                        placeholder="Description"
                        name="description"
                        value={newGear.description}
                        onChange={handleInputChange}
                        className="gear-modal-input"
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        name="stock"
                        value={newGear.stock}
                        onChange={handleInputChange}
                        className="gear-modal-input"
                    />
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleFileChange}
                        className="gear-modal-input"
                    />
                    <div className="gear-modal-image-previews">
                        {imagePreviews.map((preview, index) => (
                            <img
                                key={index}
                                src={preview}
                                alt={`Preview ${index}`}
                                className="gear-modal-image-preview"
                            />
                        ))}
                    </div>
                    <div className="gear-modal-actions">
                        <button type="submit" className="gear-modal-button gear-modal-button-add">
                            Add Gear
                        </button>
                        <button
                            type="button"
                            className="gear-modal-button gear-modal-button-cancel"
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

export default AddGearModal;
