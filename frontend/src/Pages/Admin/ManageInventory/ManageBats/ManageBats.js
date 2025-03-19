import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminHeader from "../../AdminHeader/AdminHeader";
import "./ManageBats.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import AddBatModal from "../../../../Components/Admin/ManageBats/AddBatModal";
import UpdateBatModal from "../../../../Components/Admin/ManageBats/UpdateBatModal";

const ManageBats = () => {
  const [bats, setBats] = useState([]);
  const [filteredBats, setFilteredBats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [isUpdatingModalOpen, setIsUpdatingModalOpen] = useState(false);
  const [selectedBat, setSelectedBat] = useState(null);
  const api = process.env.REACT_APP_BASE_URL;

  const fetchBats = useCallback(async () => {
    try {
      const response = await axios.get(`${api}/api/bats`);
      setBats(response.data);
      setFilteredBats(response.data);
    } catch (error) {
      console.error("Error fetching bats:", error);
    }
  }, [api]);

  useEffect(() => {
    fetchBats();
  }, [fetchBats]);

  useEffect(() => {
    const results = bats.filter((bat) => {
      const searchString = `${bat.brand} ${bat.model} ${bat.woodType} ${bat.grade}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    setFilteredBats(results);
  }, [searchTerm, bats]);

  const handleDeleteBat = async (batId) => {
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
          await axios.delete(`${api}/api/bats/${batId}`);
          setBats((prevBats) => prevBats.filter((bat) => bat._id !== batId));
          Swal.fire("Deleted!", "Bat has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting bat:", error);
          Swal.fire("Error!", "Failed to delete bat.", "error");
        }
      }
    });
  };

  const handleEditBat = (bat) => {
    setSelectedBat(bat);
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
    setSelectedBat(null);
  };

  const handleBatAdded = () => {
    fetchBats();
  };

  const handleBatUpdated = () => {
    fetchBats();
  };

  return (
    <div className="bats-bg">
      <div className="bats-content">
        <AdminHeader />
        <div className="navigation-path-admindb">
          <a href="/admindashboard">Admin Dashboard</a> / <a href="/admindashboard/manage-inventory">Manage Inventory</a> / Manage Bats
        </div>
        <h2 className="bats-title">Manage Bats</h2>

        <div className="bats-filter-container">
          <input
            type="text"
            placeholder="Search bats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bats-search-input"
          />
        </div>

        <button onClick={handleOpenAddModal} className="add-bat-button">
          Add New Bat
        </button>

        {isAddingModalOpen && (
          <AddBatModal onClose={handleCloseAddModal} onBatAdded={handleBatAdded} />
        )}

        {isUpdatingModalOpen && (
          <UpdateBatModal bat={selectedBat} onClose={handleCloseUpdateModal} onBatUpdated={handleBatUpdated} />
        )}

        <table className="bats-table">
          <thead className="bats-thead">
            <tr className="bats-tr-header">
              <th className="bats-th">Bat Image</th>
              <th className="bats-th">Brand</th>
              <th className="bats-th">Model</th>
              <th className="bats-th">Wood Type</th>
              <th className="bats-th">Grade</th>
              <th className="bats-th">Weight</th>
              <th className="bats-th">Price (LKR)</th>
              <th className="bats-th">Stock Count</th>
              <th className="bats-th">Status</th>
              <th className="bats-th">Action</th>
            </tr>
          </thead>
          <tbody className="bats-tbody">
            {filteredBats.map((bat) => (
              <tr key={bat._id} className="bats-tr-data">
                <td className="bats-td">
                  {bat.images && bat.images.length > 0 && (
                    <img
                      src={`${api}/uploads/${bat.images[0]}`}
                      alt={bat.model}
                      className="bat-preview-image"
                    />
                  )}
                </td>
                <td className="bats-td">{bat.brand}</td>
                <td className="bats-td">{bat.model}</td>
                <td className="bats-td">{bat.woodType}</td>
                <td className="bats-td">{bat.grade}</td>
                <td className="bats-td">{bat.weight}</td>
                <td className="bats-td">
                  {bat.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="bats-td">{bat.stock}</td>
                <td className="bats-td">
                  {bat.stock > 0 ? "In Stock" : "Out of Stock"}
                </td>
                <td className="bats-td">
                  <button className="bats-edit-btn" onClick={() => handleEditBat(bat)}>
                    <FaEdit />
                  </button>
                  <button className="bats-delete-btn" onClick={() => handleDeleteBat(bat._id)}>
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

export default ManageBats;