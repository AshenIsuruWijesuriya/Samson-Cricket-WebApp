import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './UpdateGearModal.css';

const UpdateGearModal = ({ gear, onClose, onGearUpdated }) => {
    const api = useMemo(() => process.env.REACT_APP_BASE_URL, []);

    const [updatedGear, setUpdatedGear] = useState({
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

    useEffect(() => {
        if (gear) {
            setUpdatedGear({ ...gear });
            if (gear.images && gear.images.length > 0) {
                setImagePreviews(gear.images.map((image) => `${api}/uploads/${image}`));
            }
        }
    }, [gear, api]);

    const handleInputChange = (e) => {
        setUpdatedGear({ ...updatedGear, [e.target.name]: e.target.value });
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
            !updatedGear.category ||
            !updatedGear.brand ||
            !updatedGear.model ||
            !updatedGear.sizeType ||
            !updatedGear.price ||
            !updatedGear.stock
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
            for (const key in updatedGear) {
                if (key !== 'images') {
                    formData.append(key, updatedGear[key]);
                }
            }

            if (selectedFiles.length > 0) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    formData.append('images', selectedFiles[i]);
                }
            } else if (gear.images && gear.images.length > 0) {
                gear.images.forEach((image) => {
                    formData.append('existingImages', image);
                });
            }

            await axios.put(`${api}/api/protection/${gear._id}`, formData, {});

            Swal.fire({
                title: 'Success!',
                text: 'Gear successfully updated!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
            onGearUpdated();
            onClose();
        } catch (error) {
            console.error('Error updating gear:', error.response?.data || error.message);
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
    const specialTypeOptions = ['Left Handed', 'Right Handed', 'None'];
    const sizeTypeOptions = ['Junior', 'Adult'];

    return (
        <div className="gear-modal-overlay">
            <div className="gear-modal-content">
                <h2 className="gear-modal-title">Update Gear</h2>
                {error && <div className="gear-modal-error">{error}</div>}
                <form className="gear-modal-form" onSubmit={handleSubmit}>
                    <select
                        name="category"
                        value={updatedGear.category}
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
                    <input placeholder="Brand" name="brand" value={updatedGear.brand} onChange={handleInputChange} className="gear-modal-input" />
                    <input placeholder="Model" name="model" value={updatedGear.model} onChange={handleInputChange} className="gear-modal-input" />
                    <select
                        name="specialType"
                        value={updatedGear.specialType}
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
                        value={updatedGear.sizeType}
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
                    <input type="number" placeholder="Price" name="price" value={updatedGear.price} onChange={handleInputChange} className="gear-modal-input" />
                    <textarea placeholder="Description" name="description" value={updatedGear.description} onChange={handleInputChange} className="gear-modal-input" />
                    <input type="number" placeholder="Stock" name="stock" value={updatedGear.stock} onChange={handleInputChange} className="gear-modal-input" />
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
                        <button type="submit" className="gear-modal-button gear-modal-button-add">Update Gear</button>
                        <button type="button" className="gear-modal-button gear-modal-button-cancel" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateGearModal;