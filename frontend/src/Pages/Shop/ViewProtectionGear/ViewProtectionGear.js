import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import MainHeader from '../../../Common/mainHeader';
import MainFooter from '../../../Common/mainFooter';
import './ViewProtectionGear.css';
import Swal from 'sweetalert2';
import { CartContext } from '../../../context/CartContext';

const ViewProtectionGear = () => {
    const [gears, setGears] = useState([]);
    const [filteredGears, setFilteredGears] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGear, setSelectedGear] = useState(null);
    const api = process.env.REACT_APP_BASE_URL;
    const { addToCart } = useContext(CartContext);

    const fetchGears = useCallback(async () => {
        try {
            const response = await axios.get(`${api}/api/protection`);
            let sortedGears = response.data.sort((a, b) => b.stock - a.stock);
            setGears(sortedGears);
            setFilteredGears(sortedGears);
        } catch (error) {
            console.error('Error fetching protection gear:', error);
        }
    }, [api]);

    useEffect(() => {
        fetchGears();
    }, [fetchGears]);

    useEffect(() => {
        const results = gears.filter((gear) => {
            const searchString = `${gear.brand} ${gear.model} ${gear.category}`.toLowerCase();
            return searchString.includes(searchTerm.toLowerCase());
        });
        let sortedResults = results.sort((a, b) => b.stock - a.stock);
        setFilteredGears(sortedResults);
    }, [searchTerm, gears]);

    const handleGearClick = (gear) => {
        setSelectedGear(gear);
    };

    const handleCloseDetails = () => {
        setSelectedGear(null);
    };

    const handleAddToCart = (gear) => {
        if (gear.stock > 0) {
            addToCart(gear);
            Swal.fire({
                icon: 'success',
                title: 'Added to Cart!',
                text: `${gear.brand} ${gear.model} has been added to your cart.`,
            });
            handleCloseDetails();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Out of Stock',
                text: `Sorry, ${gear.brand} ${gear.model} is currently out of stock.`,
            });
        }
    };

    return (
        <div className="gear-shop-container">
            <MainHeader />
            <div className="gear-shop-content">
                <h2 className="gear-shop-title">Explore Protection Gear</h2>
                <div className="gear-shop-filter">
                    <input
                        type="text"
                        placeholder="Search protection gear..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="gear-shop-search"
                    />
                </div>
                <div className="gear-shop-grid">
                    {filteredGears.map((gear) => (
                        <div key={gear._id} className="gear-shop-item" onClick={() => handleGearClick(gear)}>
                            <div className="gear-shop-image-container">
                                {gear.images && gear.images.length > 0 && (
                                    <img
                                        src={`${api}/uploads/${gear.images[0]}`}
                                        alt={gear.model}
                                        className="gear-shop-image"
                                    />
                                )}
                            </div>
                            <div className="gear-shop-details">
                                <h3 className="gear-shop-name">{gear.brand} {gear.model}</h3>
                                <div className="gear-shop-price-stock">
                                    <p className="gear-shop-price">
                                        LKR {gear.price.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>
                                    <p className={`gear-shop-stock ${gear.stock > 0 ? 'gear-shop-stock-in' : 'gear-shop-stock-out'}`}>
                                        {gear.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedGear && (
                    <div className="gear-details-overlay">
                        <div className="gear-details-modal">
                            <button className="gear-details-close" onClick={handleCloseDetails}>
                                &times;
                            </button>
                            <div className="gear-details-content">
                                <div className="gear-details-image-section">
                                    {selectedGear.images && selectedGear.images.length > 0 && (
                                        <img
                                            src={`${api}/uploads/${selectedGear.images[0]}`}
                                            alt={selectedGear.model}
                                            className="gear-details-image"
                                        />
                                    )}
                                </div>
                                <div className="gear-details-info-section">
                                    <h2 className="gear-details-title">{selectedGear.brand} {selectedGear.model}</h2>
                                    <p className="gear-details-info"><strong>Category:</strong> {selectedGear.category}</p>
                                    <p className="gear-details-info"><strong>Special Type:</strong> {selectedGear.specialType}</p>
                                    <p className="gear-details-info"><strong>Size Type:</strong> {selectedGear.sizeType}</p>
                                    <p className="gear-details-price">
                                        <strong>Price:</strong> LKR {selectedGear.price.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>
                                    <p className={`gear-details-stock ${selectedGear.stock > 0 ? 'gear-details-stock-in' : 'gear-details-stock-out'}`}>
                                        <strong>Stock:</strong> {selectedGear.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </p>
                                    <p className="gear-details-description"><strong>Description:</strong> {selectedGear.description || 'No description available.'}</p>
                                    <button className="gear-details-add-to-cart" onClick={() => handleAddToCart(selectedGear)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <MainFooter />
        </div>
    );
};

export default ViewProtectionGear;
