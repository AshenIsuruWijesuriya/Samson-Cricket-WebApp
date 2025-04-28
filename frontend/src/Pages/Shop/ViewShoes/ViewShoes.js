import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import MainHeader from "../../../Common/mainHeader";
import MainFooter from "../../../Common/mainFooter";
import "./ViewShoes.css";
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
  const [sortOption, setSortOption] = useState("stock");
  const [selectedBrands, setSelectedBrands] = useState([]);

  const uniqueBrands = [...new Set(shoes.map((shoe) => shoe.brand))];

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
    document.title = "All Shoes";
    fetchShoes();
  }, [fetchShoes]);

  useEffect(() => {
    let results = shoes.filter((shoe) => {
      const searchString = `${shoe.brand} ${shoe.model} ${shoe.category}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });

    // Apply brand filtering
    if (selectedBrands.length > 0) {
      results = results.filter((shoe) => selectedBrands.includes(shoe.brand));
    }

    // Apply sorting
    if (sortOption === "price-low-to-high") {
      results = results.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-to-low") {
      results = results.sort((a, b) => b.price - a.price);
    } else {
      results = results.sort((a, b) => b.stock - a.stock);
    }

    setFilteredShoes(results);
    setCurrentPage(1);
  }, [searchTerm, shoes, sortOption, selectedBrands]);

  const handleShoeClick = (shoe) => {
    setSelectedShoe(shoe);
  };

  const handleCloseDetails = () => {
    setSelectedShoe(null);
  };

  const handleAddToCart = (shoe) => {
    if (shoe.stock > 0) {
      const shoeWithCategory = {
        ...shoe,
        category: "shoes",
      };
      addToCart(shoeWithCategory);
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

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
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
          <div className="shoe-filter-sort-container">
            <div className="shoe-shop-brands">
              <span className="filter-label">Filter by Brand:</span>
              {uniqueBrands.map((brand) => (
                <label key={brand} className="shoe-shop-brand-label">
                  <input
                    type="checkbox"
                    value={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
            <div className="shoe-shop-sort">
              <span className="filter-label">Sort by Price:</span>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="shoe-shop-sort-select"
              >
                <option value="stock">Relevance</option>
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>
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

