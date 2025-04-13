import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import MainHeader from "../../../Common/mainHeader";
import MainFooter from "../../../Common/mainFooter";
import "./ViewShoes.css"; // Create a new CSS file for shoes
import Swal from "sweetalert2";
import { CartContext } from "../../../context/CartContext";

const ViewShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShoe, setSelectedShoe] = useState(null);
  const api = process.env.REACT_APP_BASE_URL;
    const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const shoesPerPage = 8;

  const fetchShoes = useCallback(async () => {
    try {
      const response = await axios.get(`${api}/api/shoes`);
      let sortedShoes = response.data.sort((a, b) => b.stock - a.stock);
      setShoes(sortedShoes);
      setFilteredShoes(sortedShoes);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  }, [api]);

  useEffect(() => {
    document.title = 'All Shoes';
    fetchShoes();
  }, [fetchShoes]);

  useEffect(() => {
    const results = shoes.filter((shoe) => {
      const searchString = `${shoe.brand} ${shoe.model} ${shoe.category}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
        let sortedResults = results.sort((a, b) => b.stock - a.stock);
    setFilteredShoes(sortedResults);
    setCurrentPage(1); // Reset to first page when search term changes
  }, [searchTerm, shoes]);

  const handleShoeClick = (shoe) => {
    setSelectedShoe(shoe);
  };

  const handleCloseDetails = () => {
    setSelectedShoe(null);
  };

    const handleAddToCart = (shoe) => {
    if (shoe.stock > 0) {
      addToCart(shoe);
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${shoe.brand} ${shoe.model} has been added to your cart.`,
      });
      handleCloseDetails();
    } else {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: `Sorry, ${shoe.brand} ${shoe.model} is currently out of stock.`,
      });
    }
  };

  const indexOfLastShoe = currentPage * shoesPerPage;
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  const currentShoes = filteredShoes.slice(indexOfFirstShoe, indexOfLastShoe);

  const totalPages = Math.ceil(filteredShoes.length / shoesPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="shoe-shop-container">
      <MainHeader />
      <div className="shoe-shop-content">
        <div className="navigation-path-shop">
          <a href="/shop">Shop</a> / Shoes
        </div>
        <h2 className="shoe-shop-title">Explore Cricket Shoes</h2>
        <div className="shoe-shop-filter">
          <input
            type="text"
            placeholder="Search shoes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shoe-shop-search"
          />
        </div>
        <div className="shoe-shop-grid">
          {currentShoes.map((shoe) => (
            <div
              key={shoe._id}
              className="shoe-shop-item"
              onClick={() => handleShoeClick(shoe)}
            >
              <div className="shoe-shop-image-container">
                {shoe.images && shoe.images.length > 0 && (
                  <img
                    src={`${api}/uploads/${shoe.images[0]}`}
                    alt={shoe.model}
                    className="shoe-shop-image"
                  />
                )}
              </div>
              <div className="shoe-shop-details">
                <h3 className="shoe-shop-name">
                  {shoe.brand} {shoe.model}
                </h3>
                 <p className="shoe-shop-category">
                    Category: {shoe.category}
                  </p>
                <div className="shoe-shop-price-stock">
                  <p className="shoe-shop-price">
                    LKR{" "}
                    {shoe.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p
                    className={`shoe-shop-stock ${
                      shoe.stock > 0 ? "shoe-shop-stock-in" : "shoe-shop-stock-out"
                    }`}
                  >
                    {shoe.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="shoe-shop-pagination">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="shoe-shop-pagination-button"
            >
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="shoe-shop-pagination-button"
            >
              Next
            </button>
          </div>
        )}
        {selectedShoe && (
          <div className="shoe-details-overlay">
            <div className="shoe-details-modal">
              <button
                className="shoe-details-close"
                onClick={handleCloseDetails}
              >
                &times;
              </button>
              <div className="shoe-details-content">
                <div className="shoe-details-image-section">
                  {selectedShoe.images && selectedShoe.images.length > 0 && (
                    <img
                      src={`${api}/uploads/${selectedShoe.images[0]}`}
                      alt={selectedShoe.model}
                      className="shoe-details-image"
                    />
                  )}
                </div>
                <div className="shoe-details-info-section">
                  <h2 className="shoe-details-title">
                    {selectedShoe.brand} {selectedShoe.model}
                  </h2>
                  <p className="shoe-details-info">
                    <strong>Category:</strong> {selectedShoe.category}
                  </p>
                  <p className="shoe-details-info">
                    <strong>Size:</strong> {selectedShoe.size}
                  </p>
                  <p className="shoe-details-info">
                    <strong>Color:</strong> {selectedShoe.color}
                  </p>
                  <p className="shoe-details-price">
                    <strong>Price:</strong> LKR{" "}
                    {selectedShoe.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p
                    className={`shoe-details-stock ${
                      selectedShoe.stock > 0
                        ? "shoe-details-stock-in"
                        : "shoe-details-stock-out"
                    }`}
                  >
                    <strong>Stock:</strong>{" "}
                    {selectedShoe.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                  <p className="shoe-details-description">
                    <strong>Description:</strong>{" "}
                    {selectedShoe.description || "No description available."}
                  </p>
                  <button
                    className="shoe-details-add-to-cart"
                    onClick={() => handleAddToCart(selectedShoe)}
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

export default ViewShoes;
