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
    const [currentPage, setCurrentPage] = useState(1);
    const merchandisePerPage = 8;
    const [sortOption, setSortOption] = useState('stock'); // Default sort by stock
    const [selectedBrands, setSelectedBrands] = useState([]); // Add state for brand filtering

    // Get unique brands for filtering
    const uniqueBrands = [...new Set(merchandise.map(item => item.brand))];

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
        document.title = 'All Merchandise';
        fetchMerchandise();
    }, [fetchMerchandise]);

    useEffect(() => {
        let results = merchandise.filter((merch) => {
            const searchString = `${merch.name} ${merch.category} ${merch.brand} ${merch.size}`.toLowerCase();
            return searchString.includes(searchTerm.toLowerCase());
        });

        // Apply brand filtering
        if (selectedBrands.length > 0) {
            results = results.filter(merch => selectedBrands.includes(merch.brand));
        }

        // Apply sorting
        if (sortOption === 'price-low-to-high') {
            results = results.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-high-to-low') {
            results = results.sort((a, b) => b.price - a.price);
        } else { // Default sort by stock
            results = results.sort((a, b) => b.stock - a.stock);
        }

        setFilteredMerchandise(results);
        setCurrentPage(1); // Reset to first page when search term changes
    }, [searchTerm, merchandise, sortOption, selectedBrands]);

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

    const indexOfLastMerch = currentPage * merchandisePerPage;
    const indexOfFirstMerch = indexOfLastMerch - merchandisePerPage;
    const currentMerchandise = filteredMerchandise.slice(indexOfFirstMerch, indexOfLastMerch);

    const totalPages = Math.ceil(filteredMerchandise.length / merchandisePerPage);

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
                    <div className="merch-filter-sort-container">
                        <div className="merch-shop-brands">
                            <span className="filter-label">Filter by Brand:</span>
                            {uniqueBrands.map((brand) => (
                                <label key={brand} className="merch-shop-brand-label">
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
                        <div className="merch-shop-sort">
                            <span className="filter-label">Sort by Price:</span>
                            <select
                                value={sortOption}
                                onChange={handleSortChange}
                                className="merch-shop-sort-select"
                            >
                                <option value="stock">Relevance</option>
                                <option value="price-low-to-high">Price: Low to High</option>
                                <option value="price-high-to-low">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="merch-shop-grid">
                    {currentMerchandise.map((merch) => (
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
                {totalPages > 1 && (
                    <div className="merch-shop-pagination">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="merch-shop-pagination-button"
                        >
                            Previous
                        </button>
                        <span>{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="merch-shop-pagination-button"
                        >
                            Next
                        </button>
                    </div>
                )}
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