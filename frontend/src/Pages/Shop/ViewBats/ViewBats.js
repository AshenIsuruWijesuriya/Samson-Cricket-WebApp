import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MainHeader from '../../../Common/mainHeader';
import './ViewBats.css';
import Swal from 'sweetalert2'; // Import SweetAlert

const ViewBats = () => {
  const [bats, setBats] = useState([]);
  const [filteredBats, setFilteredBats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBat, setSelectedBat] = useState(null);
  const api = process.env.REACT_APP_BASE_URL;

  const fetchBats = useCallback(async () => {
    try {
      const response = await axios.get(`${api}/api/bats`);
      setBats(response.data);
      setFilteredBats(response.data);
    } catch (error) {
      console.error('Error fetching bats:', error);
    }
  }, [api]);

  useEffect(() => {
    fetchBats();
  }, [fetchBats]);

  useEffect(() => {
    const results = bats.filter((bat) => {
      const searchString = `${bat.brand} ${bat.model}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    setFilteredBats(results);
  }, [searchTerm, bats]);

  const handleBatClick = (bat) => {
    setSelectedBat(bat);
  };

  const handleCloseDetails = () => {
    setSelectedBat(null);
  };

  const handleAddToCart = (bat) => {
    if (bat.stock > 0) {
      // In Stock
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        text: `${bat.brand} ${bat.model} has been added to your cart.`,
      });
      console.log('Added to cart:', bat);
      handleCloseDetails();
    } else {
      // Out of Stock
      Swal.fire({
        icon: 'error',
        title: 'Out of Stock',
        text: `Sorry, ${bat.brand} ${bat.model} is currently out of stock.`,
      });
    }
  };

  return (
    <div className="bat-shop-container">
      <MainHeader />
      <div className="bat-shop-content">
        <h2 className="bat-shop-title">Explore Cricket Bats</h2>
        <div className="bat-shop-filter">
          <input
            type="text"
            placeholder="Search bats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bat-shop-search"
          />
        </div>
        <div className="bat-shop-grid">
          {filteredBats.map((bat) => (
            <div key={bat._id} className="bat-shop-item" onClick={() => handleBatClick(bat)}>
              <div className="bat-shop-image-container">
                {bat.images && bat.images.length > 0 && (
                  <img
                    src={`${api}/uploads/${bat.images[0]}`}
                    alt={bat.model}
                    className="bat-shop-image"
                  />
                )}
              </div>
              <div className="bat-shop-details">
                <h3 className="bat-shop-name">{bat.brand} {bat.model}</h3>
                <div className="bat-shop-price-stock">
                  <p className="bat-shop-price">
                    LKR {bat.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className={`bat-shop-stock ${bat.stock > 0 ? 'bat-shop-stock-in' : 'bat-shop-stock-out'}`}>
                    {bat.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedBat && (
          <div className="bat-details-overlay">
            <div className="bat-details-modal">
              <button className="bat-details-close" onClick={handleCloseDetails}>
                &times;
              </button>
              <h2 className="bat-details-title">{selectedBat.brand} {selectedBat.model}</h2>
              {selectedBat.images && selectedBat.images.length > 0 && (
                <img
                  src={`${api}/uploads/${selectedBat.images[0]}`}
                  alt={selectedBat.model}
                  className="bat-details-image"
                />
              )}
              <p className="bat-details-info">Wood: {selectedBat.woodType}</p>
              <p className="bat-details-info">Grade: {selectedBat.grade}</p>
              <p className="bat-details-info">Weight: {selectedBat.weight}</p>
              <p className="bat-details-price">
                Price: LKR {selectedBat.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className={`bat-details-stock ${selectedBat.stock > 0 ? 'bat-details-stock-in' : 'bat-details-stock-out'}`}>
                Stock: {selectedBat.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
              <button className="bat-details-add-to-cart" onClick={() => handleAddToCart(selectedBat)}>
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBats;