import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import MainHeader from "../../../Common/mainHeader";
import MainFooter from "../../../Common/mainFooter";
import "./ViewMerchandise.css"; 
import Swal from "sweetalert2";
import { CartContext } from "../../../context/CartContext";

const ViewMerchandise = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [filteredMerchandise, setFilteredMerchandise] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMerch, setSelectedMerch] = useState(null);
  const api = process.env.REACT_APP_BASE_URL;
  const { addToCart } = useContext(CartContext);

  const fetchMerchandise = useCallback(async () => {
    try {
      const response = await axios.get(`${api}/api/merch`);
      let sortedMerchandise = response.data.sort((a, b) => b.stock - a.stock);
      setMerchandise(sortedMerchandise);
      setFilteredMerchandise(sortedMerchandise);
    } catch (error) {
      console.error("Error fetching merchandise:", error);
    }
  }, [api]);

  useEffect(() => {
    fetchMerchandise();
  }, [fetchMerchandise]);

  useEffect(() => {
    const results = merchandise.filter((merch) => {
      const searchString = `${merch.name} ${merch.category} ${merch.brand} ${merch.size}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    let sortedResults = results.sort((a, b) => b.stock - a.stock);
    setFilteredMerchandise(sortedResults);
  }, [searchTerm, merchandise]);

  const handleMerchClick = (merch) => {
    setSelectedMerch(merch);
  };

  const handleCloseDetails = () => {
    setSelectedMerch(null);
  };

  const handleAddToCart = (merch) => {
    if (merch.stock > 0) {
      addToCart(merch);
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${merch.name} has been added to your cart.`,
      });
      handleCloseDetails();
    } else {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: `Sorry, ${merch.name} is currently out of stock.`,
      });
    }
  };

  return (
    <div className="merch-shop-container">
      <MainHeader />
      <div className="merch-shop-content">
        <div className="navigation-path-shop">
          <a href="/shop">Shop</a> / Merchandise
        </div>
        <h2 className="merch-shop-title">Explore Merchandise</h2>
        <div className="merch-shop-filter">
          <input
            type="text"
            placeholder="Search merchandise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="merch-shop-search"
          />
        </div>
        <div className="merch-shop-grid">
          {filteredMerchandise.map((merch) => (
            <div
              key={merch._id}
              className="merch-shop-item"
              onClick={() => handleMerchClick(merch)}
            >
              <div className="merch-shop-image-container">
                {merch.images && merch.images.length > 0 && (
                  <img
                    src={`${api}/uploads/${merch.images[0]}`}
                    alt={merch.name}
                    className="merch-shop-image"
                  />
                )}
              </div>
              <div className="merch-shop-details">
                <h3 className="merch-shop-name">{merch.name}</h3>
                <div className="merch-shop-price-stock">
                  <p className="merch-shop-price">
                    LKR{" "}
                    {merch.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p
                    className={`merch-shop-stock ${
                      merch.stock > 0
                        ? "merch-shop-stock-in"
                        : "merch-shop-stock-out"
                    }`}
                  >
                    {merch.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedMerch && (
          <div className="merch-details-overlay">
            <div className="merch-details-modal">
              <button
                className="merch-details-close"
                onClick={handleCloseDetails}
              >
                &times;
              </button>
              <div className="merch-details-content">
                <div className="merch-details-image-section">
                  {selectedMerch.images && selectedMerch.images.length > 0 && (
                    <img
                      src={`${api}/uploads/${selectedMerch.images[0]}`}
                      alt={selectedMerch.name}
                      className="merch-details-image"
                    />
                  )}
                </div>
                <div className="merch-details-info-section">
                  <h2 className="merch-details-title">{selectedMerch.name}</h2>
                  <p className="merch-details-info">
                    <strong>Category:</strong> {selectedMerch.category}
                  </p>
                  <p className="merch-details-info">
                    <strong>Brand:</strong> {selectedMerch.brand}
                  </p>
                  <p className="merch-details-info">
                    <strong>Size:</strong> {selectedMerch.size}
                  </p>
                  <p className="merch-details-price">
                    <strong>Price:</strong> LKR{" "}
                    {selectedMerch.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p
                    className={`merch-details-stock ${
                      selectedMerch.stock > 0
                        ? "merch-details-stock-in"
                        : "merch-details-stock-out"
                    }`}
                  >
                    <strong>Stock:</strong>{" "}
                    {selectedMerch.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                  <p className="merch-details-description">
                    <strong>Description:</strong>{" "}
                    {selectedMerch.description || "No description available."}
                  </p>
                  <button
                    className="merch-details-add-to-cart"
                    onClick={() => handleAddToCart(selectedMerch)}
                  >
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

export default ViewMerchandise;