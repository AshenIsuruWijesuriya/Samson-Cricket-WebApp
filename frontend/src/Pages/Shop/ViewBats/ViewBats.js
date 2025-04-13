import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import MainHeader from "../../../Common/mainHeader";
import MainFooter from "../../../Common/mainFooter";
import "./ViewBats.css";
import Swal from "sweetalert2";
import { CartContext } from "../../../context/CartContext";

const ViewBats = () => {
    const [bats, setBats] = useState([]);
    const [filteredBats, setFilteredBats] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBat, setSelectedBat] = useState(null);
    const api = process.env.REACT_APP_BASE_URL;
    const { addToCart } = useContext(CartContext);
    const [currentPage, setCurrentPage] = useState(1);
    const batsPerPage = 8;
    const [sortOption, setSortOption] = useState('stock'); // Default sort by stock
    const [selectedBrands, setSelectedBrands] = useState([]); // Add state for brand filtering

    // Get unique brands for filtering
    const uniqueBrands = [...new Set(bats.map(bat => bat.brand))];

    const fetchBats = useCallback(async () => {
        try {
            const response = await axios.get(`${api}/api/bats`);
            let sortedBats = response.data.sort((a, b) => b.stock - a.stock);
            setBats(sortedBats);
            setFilteredBats(sortedBats);
        } catch (error) {
            console.error("Error fetching bats:", error);
        }
    }, [api]);

    useEffect(() => {
        document.title = 'All Bats';
        fetchBats();
    }, [fetchBats]);

    useEffect(() => {
        let results = bats.filter((bat) => {
            const searchString = `${bat.brand} ${bat.model}`.toLowerCase();
            return searchString.includes(searchTerm.toLowerCase());
        });

        // Apply brand filtering
         if (selectedBrands.length > 0) {
            results = results.filter(bat => selectedBrands.includes(bat.brand));
        }

        // Apply sorting
        if (sortOption === 'price-low-to-high') {
            results = results.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-high-to-low') {
            results = results.sort((a, b) => b.price - a.price);
        } else { // Default sort by stock
            results = results.sort((a, b) => b.stock - a.stock);
        }

        setFilteredBats(results);
        setCurrentPage(1); // Reset to first page when search term changes
    }, [searchTerm, bats, sortOption, selectedBrands]);

    const handleBatClick = (bat) => {
        setSelectedBat(bat);
    };

    const handleCloseDetails = () => {
        setSelectedBat(null);
    };

    const handleAddToCart = (bat) => {
        if (bat.stock > 0) {
            addToCart(bat);
            Swal.fire({
                icon: "success",
                title: "Added to Cart!",
                text: `${bat.brand} ${bat.model} has been added to your cart.`,
            });
            handleCloseDetails();
        } else {
            Swal.fire({
                icon: "error",
                title: "Out of Stock",
                text: `Sorry, ${bat.brand} ${bat.model} is currently out of stock.`,
            });
        }
    };

    const indexOfLastBat = currentPage * batsPerPage;
    const indexOfFirstBat = indexOfLastBat - batsPerPage;
    const currentBats = filteredBats.slice(indexOfFirstBat, indexOfLastBat);

    const totalPages = Math.ceil(filteredBats.length / batsPerPage);

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
        <div className="bat-shop-container">
            <MainHeader />
            <div className="bat-shop-content">
                <div className="navigation-path-shop">
                    <a href="/shop">Shop</a> / Bats
                </div>
                <h2 className="bat-shop-title">Explore Cricket Bats</h2>
                <div className="bat-shop-filter">
                    <input
                        type="text"
                        placeholder="Search bats..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bat-shop-search"
                    />
                    <div className="bat-filter-sort-container">
                        <div className="bat-shop-brands">
                            <span className="filter-label">Filter by Brand:</span>
                            {uniqueBrands.map((brand) => (
                                <label key={brand} className="bat-shop-brand-label">
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
                        <div className="bat-shop-sort">
                            <span className="filter-label">Sort by Price:</span>
                            <select
                                value={sortOption}
                                onChange={handleSortChange}
                                className="bat-shop-sort-select" //Added Classname
                            >
                                <option value="stock">Relevance</option>
                                <option value="price-low-to-high">Price: Low to High</option>
                                <option value="price-high-to-low">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bat-shop-grid">
                    {currentBats.map((bat) => (
                        <div
                            key={bat._id}
                            className="bat-shop-item"
                            onClick={() => handleBatClick(bat)}
                        >
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
                                <h3 className="bat-shop-name">
                                    {bat.brand} {bat.model}
                                </h3>
                                <div className="bat-shop-price-stock">
                                    <p className="bat-shop-price">
                                        LKR{" "}
                                        {bat.price.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>
                                    <p
                                        className={`bat-shop-stock ${
                                            bat.stock > 0 ? "bat-shop-stock-in" : "bat-shop-stock-out"
                                        }`}
                                    >
                                        {bat.stock > 0 ? "In Stock" : "Out of Stock"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="bat-shop-pagination">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="bat-shop-pagination-button"
                        >
                            Previous
                        </button>
                        <span>{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="bat-shop-pagination-button"
                        >
                            Next
                        </button>
                    </div>
                )}
                {selectedBat && (
                    <div className="bat-details-overlay">
                        <div className="bat-details-modal">
                            <button
                                className="bat-details-close"
                                onClick={handleCloseDetails}
                            >
                                &times;
                            </button>
                            <div className="bat-details-content">
                                <div className="bat-details-image-section">
                                    {selectedBat.images && selectedBat.images.length > 0 && (
                                        <img
                                            src={`${api}/uploads/${selectedBat.images[0]}`}
                                            alt={selectedBat.model}
                                            className="bat-details-image"
                                        />
                                    )}
                                </div>
                                <div className="bat-details-info-section">
                                    <h2 className="bat-details-title">
                                        {selectedBat.brand} {selectedBat.model}
                                    </h2>
                                    <p className="bat-details-info">
                                        <strong>Wood:</strong> {selectedBat.woodType}
                                    </p>
                                    <p className="bat-details-info">
                                        <strong>Grade:</strong> {selectedBat.grade}
                                    </p>
                                    <p className="bat-details-info">
                                        <strong>Weight:</strong> {selectedBat.weight}
                                    </p>
                                    <p className="bat-details-price">
                                        <strong>Price:</strong> LKR{" "}
                                        {selectedBat.price.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>
                                    <p
                                        className={`bat-details-stock ${
                                            selectedBat.stock > 0
                                                ? "bat-details-stock-in"
                                                : "bat-details-stock-out"
                                        }`}
                                    >
                                        <strong>Stock:</strong>{" "}
                                        {selectedBat.stock > 0 ? "In Stock" : "Out of Stock"}
                                    </p>
                                    <p className="bat-details-description">
                                        <strong>Description:</strong>{" "}
                                        {selectedBat.description || "No description available."}
                                    </p>
                                    <button
                                        className="bat-details-add-to-cart"
                                        onClick={() => handleAddToCart(selectedBat)}
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

export default ViewBats;
