import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import MainHeader from "../../../Common/mainHeader";
import MainFooter from "../../../Common/mainFooter";
import "./ViewProtectionGear.css";
import Swal from "sweetalert2";
import { CartContext } from "../../../context/CartContext";

const ViewProtectionGear = () => {
  const [gears, setGears] = useState([]);
  const [filteredGears, setFilteredGears] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGear, setSelectedGear] = useState(null);
  const api = process.env.REACT_APP_BASE_URL;
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const gearsPerPage = 8;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // "" | "asc" | "desc"

  const categories = [
    "Helmet",
    "Batting Pads",
    "Wicket Keeping Pads",
    "Gloves",
    "Bowl Guard",
    "Tie Pads",
    "Arm Guard",
  ];

  const fetchGears = useCallback(async () => {
    try {
      const response = await axios.get(`${api}/api/protection`);
      let sortedGears = response.data.sort((a, b) => b.stock - a.stock);
      setGears(sortedGears);
      setFilteredGears(sortedGears);
    } catch (error) {
      console.error("Error fetching protection gear:", error);
    }
  }, [api]);

  useEffect(() => {
    document.title = "Protection & Others";
    fetchGears();
  }, [fetchGears]);

  useEffect(() => {
    let results = gears.filter((gear) => {
      const searchString = `${gear.brand} ${gear.model} ${gear.category}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });

    if (selectedCategories.length > 0) {
      results = results.filter((gear) =>
        selectedCategories.includes(gear.category)
      );
    }

    // Sorting
    if (sortOrder === "asc") {
      results = results.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      results = results.sort((a, b) => b.price - a.price);
    } else {
      results = results.sort((a, b) => b.stock - a.stock);
    }

    setFilteredGears(results);
    setCurrentPage(1);
  }, [searchTerm, gears, selectedCategories, sortOrder]);

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
        icon: "success",
        title: "Added to Cart!",
        text: `${gear.brand} ${gear.model} has been added to your cart.`,
      });
      handleCloseDetails();
    } else {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: `Sorry, ${gear.brand} ${gear.model} is currently out of stock.`,
      });
    }
  };

  const indexOfLastGear = currentPage * gearsPerPage;
  const indexOfFirstGear = indexOfLastGear - gearsPerPage;
  const currentGears = filteredGears.slice(indexOfFirstGear, indexOfLastGear);

  const totalPages = Math.ceil(filteredGears.length / gearsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="gear-shop-container">
      <MainHeader />
      <div className="gear-shop-content">
        <div className="navigation-path-shop">
          <a href="/shop">Shop</a> / Protection & Others
        </div>
        <h2 className="gear-shop-title">Explore Protection Gear</h2>
        <div className="gear-shop-filter">
          <input
            type="text"
            placeholder="Search protection gear..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="gear-shop-search"
          />
          <div className="filter-sort-container">
            <div className="gear-shop-categories">
              <span className="filter-label">Filter by Category:</span>
              {categories.map((category) => (
                <label key={category} className="gear-shop-category-label">
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
            <div className="gear-shop-sort">
              <span className="filter-label">Sort by Price:</span>
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="gear-shop-sort-select"
              >
                <option value="">Relevance</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="gear-shop-grid">
          {currentGears.map((gear) => (
            <div
              key={gear._id}
              className="gear-shop-item"
              onClick={() => handleGearClick(gear)}
            >
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
                <h3 className="gear-shop-name">
                  {gear.brand} {gear.model}
                </h3>
                <div className="gear-shop-price-stock">
                  <p className="gear-shop-price">
                    LKR{" "}
                    {gear.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p
                    className={`gear-shop-stock ${
                      gear.stock > 0
                        ? "gear-shop-stock-in"
                        : "gear-shop-stock-out"
                    }`}
                  >
                    {gear.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="gear-shop-pagination">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="gear-shop-pagination-button"
            >
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="gear-shop-pagination-button"
            >
              Next
            </button>
          </div>
        )}
        {selectedGear && (
          <div className="gear-details-overlay">
            <div className="gear-details-modal">
              <button
                className="gear-details-close"
                onClick={handleCloseDetails}
              >
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
                  <h2 className="gear-details-title">
                    {selectedGear.brand} {selectedGear.model}
                  </h2>
                  <p className="gear-details-info">
                    <strong>Category:</strong> {selectedGear.category}
                  </p>
                  <p className="gear-details-info">
                    <strong>Special Type:</strong> {selectedGear.specialType}
                  </p>
                  <p className="gear-details-info">
                    <strong>Size Type:</strong> {selectedGear.sizeType}
                  </p>
                  <p className="gear-details-price">
                    <strong>Price:</strong> LKR{" "}
                    {selectedGear.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p
                    className={`gear-details-stock ${
                      selectedGear.stock > 0
                        ? "gear-details-stock-in"
                        : "gear-details-stock-out"
                    }`}
                  >
                    <strong>Stock:</strong>{" "}
                    {selectedGear.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                  <p className="gear-details-description">
                    <strong>Description:</strong>{" "}
                    {selectedGear.description || "No description available."}
                  </p>
                  <button
                    className="gear-details-add-to-cart"
                    onClick={() => handleAddToCart(selectedGear)}
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

export default ViewProtectionGear;
