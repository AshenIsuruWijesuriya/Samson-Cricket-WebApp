import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminHeader from "../../AdminHeader/AdminHeader";
import "./ManageProtectionGear.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import AddGearModal from "../../../../Components/Admin/ManageProtection/AddGearModal"; 
import UpdateGearModal from "../../../../Components/Admin/ManageProtection/UpdateGearModal"; 

const ManageProtectionGear = () => {
    const [gear, setGear] = useState([]);
    const [filteredGear, setFilteredGear] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
    const [isUpdatingModalOpen, setIsUpdatingModalOpen] = useState(false);
    const [selectedGear, setSelectedGear] = useState(null);
    const api = process.env.REACT_APP_BASE_URL;

    const fetchGear = useCallback(async () => {
        try {
            const response = await axios.get(`${api}/api/protection`); 
            setGear(response.data);
            setFilteredGear(response.data);
        } catch (error) {
            console.error("Error fetching gear:", error);
        }
    }, [api]);

    useEffect(() => {
        fetchGear();
    }, [fetchGear]);

    useEffect(() => {
        const results = gear.filter((item) => {
            const searchString = `${item.brand} ${item.model} ${item.category} ${item.sizeType} ${item.specialType}`.toLowerCase();
            return searchString.includes(searchTerm.toLowerCase());
        });
        setFilteredGear(results);
    }, [searchTerm, gear]);

    const handleDeleteGear = async (gearId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${api}/api/protection/${gearId}`); // Corrected route
                    setGear((prevGear) => prevGear.filter((item) => item._id !== gearId));
                    Swal.fire("Deleted!", "Gear has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting gear:", error);
                    Swal.fire("Error!", "Failed to delete gear.", "error");
                }
            }
        });
    };

    const handleEditGear = (item) => {
        setSelectedGear(item);
        setIsUpdatingModalOpen(true);
    };

    const handleOpenAddModal = () => {
        setIsAddingModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddingModalOpen(false);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdatingModalOpen(false);
        setSelectedGear(null);
    };

    const handleGearAdded = () => {
        fetchGear();
    };

    const handleGearUpdated = () => {
        fetchGear();
    };

    return (
        <div className="gear-bg">
            <div className="gear-content">
                <AdminHeader />
                <div className="navigation-path-admindb">
                    <a href="/admindashboard">Admin Dashboard</a> / <a href="/admindashboard/manage-inventory">Manage Inventory</a> / Manage Protection Gear
                </div>
                <h2 className="gear-title">Manage Protection Gear</h2>

                <div className="gear-filter-container">
                    <input
                        type="text"
                        placeholder="Search protection gear..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="gear-search-input"
                    />
                </div>

                <button onClick={handleOpenAddModal} className="add-gear-button">
                    Add New Gear
                </button>

                {isAddingModalOpen && (
                    <AddGearModal onClose={handleCloseAddModal} onGearAdded={handleGearAdded} />
                )}

                {isUpdatingModalOpen && (
                    <UpdateGearModal gear={selectedGear} onClose={handleCloseUpdateModal} onGearUpdated={handleGearUpdated} />
                )}

                <table className="gear-table">
                    <thead className="gear-thead">
                        <tr className="gear-tr-header">
                            <th className="gear-th">Gear Image</th>
                            <th className="gear-th">Category</th>
                            <th className="gear-th">Brand</th>
                            <th className="gear-th">Model</th>
                            <th className="gear-th">Special Type</th>
                            <th className="gear-th">Size Type</th>
                            <th className="gear-th">Price (LKR)</th>
                            <th className="gear-th">Stock Count</th>
                            <th className="gear-th">Status</th>
                            <th className="gear-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="gear-tbody">
                        {filteredGear.map((item) => (
                            <tr key={item._id} className="gear-tr-data">
                                <td className="gear-td">
                                    {item.images && item.images.length > 0 && (
                                        <img
                                            src={`${api}/uploads/${item.images[0]}`}
                                            alt={item.model}
                                            className="gear-preview-image"
                                        />
                                    )}
                                </td>
                                <td className="gear-td">{item.category}</td>
                                <td className="gear-td">{item.brand}</td>
                                <td className="gear-td">{item.model}</td>
                                <td className="gear-td">{item.specialType}</td>
                                <td className="gear-td">{item.sizeType}</td>
                                <td className="gear-td">
                                    {item.price.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </td>
                                <td className="gear-td">{item.stock}</td>
                                <td className="gear-td">
                                    {item.stock > 0 ? "In Stock" : "Out of Stock"}
                                </td>
                                <td className="gear-td">
                                    <button className="gear-edit-btn" onClick={() => handleEditGear(item)}>
                                        <FaEdit />
                                    </button>
                                    <button className="gear-delete-btn" onClick={() => handleDeleteGear(item._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProtectionGear;
