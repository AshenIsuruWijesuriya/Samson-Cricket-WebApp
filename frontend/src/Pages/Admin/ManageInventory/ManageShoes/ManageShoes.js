import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminHeader from "../../AdminHeader/AdminHeader";
import "./ManageShoes.css"; // Create a new CSS file for managing shoes
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import AddShoeModal from "../../../../Components/Admin/ManageShoes/AddShoeModel"; // Create AddShoeModal
import UpdateShoeModal from "../../../../Components/Admin/ManageShoes/UpdateShoeModal"; // Create UpdateShoeModal

const ManageShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [isUpdatingModalOpen, setIsUpdatingModalOpen] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const api = process.env.REACT_APP_BASE_URL;

  const fetchShoes = useCallback(async () => {
    try {
      const response = await axios.get(`${api}/api/shoes`);
      setShoes(response.data);
      setFilteredShoes(response.data);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  }, [api]);

  useEffect(() => {
    fetchShoes();
  }, [fetchShoes]);

  useEffect(() => {
    const results = shoes.filter((shoe) => {
      const searchString = `${shoe.brand} ${shoe.model} ${shoe.color}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    setFilteredShoes(results);
  }, [searchTerm, shoes]);

  const handleDeleteShoe = async (shoeId) => {
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
          await axios.delete(`${api}/api/shoes/${shoeId}`);
          setShoes((prevShoes) => prevShoes.filter((shoe) => shoe._id !== shoeId));
          Swal.fire("Deleted!", "Shoe has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting shoe:", error);
          Swal.fire("Error!", "Failed to delete shoe.", "error");
        }
      }
    });
  };

  const handleEditShoe = (shoe) => {
    setSelectedShoe(shoe);
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
    setSelectedShoe(null);
  };

  const handleShoeAdded = () => {
    fetchShoes();
  };

  const handleShoeUpdated = () => {
    fetchShoes();
  };

  return (
    <div className="shoes-bg"> {/* Apply a new CSS class for the background */}
      <div className="shoes-content">
        <AdminHeader />
        <div className="navigation-path-admindb">
          <a href="/admindashboard">Admin Dashboard</a> / <a href="/admindashboard/manage-inventory">Manage Inventory</a> / Manage Shoes
        </div>
        <h2 className="shoes-title">Manage Shoes</h2> {/* Apply a new CSS class for the title */}

        <div className="shoes-filter-container"> {/* Apply a new CSS class for the filter */}
          <input
            type="text"
            placeholder="Search shoes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shoes-search-input" // Apply a new CSS class for the search input
          />
        </div>

        <button onClick={handleOpenAddModal} className="add-shoe-button"> {/* Apply a new CSS class for the add button */}
          Add New Shoe
        </button>

        {isAddingModalOpen && (
          <AddShoeModal onClose={handleCloseAddModal} onShoeAdded={handleShoeAdded} />
        )}

        {isUpdatingModalOpen && (
          <UpdateShoeModal shoe={selectedShoe} onClose={handleCloseUpdateModal} onShoeUpdated={handleShoeUpdated} />
        )}

        <table className="shoes-table"> {/* Apply a new CSS class for the table */}
          <thead className="shoes-thead"> {/* Apply a new CSS class for the table head */}
            <tr className="shoes-tr-header"> {/* Apply a new CSS class for the table row in head */}
              <th className="shoes-th">Shoe Image</th> {/* Apply a new CSS class for the table header */}
              <th className="shoes-th">Brand</th>
              <th className="shoes-th">Model</th>
              <th className="shoes-th">Size</th>
              <th className="shoes-th">Price (LKR)</th>
              <th className="shoes-th">Stock Count</th>
              <th className="shoes-th">Status</th>
              <th className="shoes-th">Action</th>
            </tr>
          </thead>
          <tbody className="shoes-tbody"> {/* Apply a new CSS class for the table body */}
            {filteredShoes.map((shoe) => (
              <tr key={shoe._id} className="shoes-tr-data"> {/* Apply a new CSS class for the table row in body */}
                <td className="shoes-td"> {/* Apply a new CSS class for the table data */}
                  {shoe.images && shoe.images.length > 0 && (
                    <img
                      src={`${api}/uploads/${shoe.images[0]}`}
                      alt={shoe.model}
                      className="shoe-preview-image" // Apply a new CSS class for the image
                    />
                  )}
                </td>
                <td className="shoes-td">{shoe.brand}</td>
                <td className="shoes-td">{shoe.model}</td>
                <td className="shoes-td">{shoe.size}</td>
                <td className="shoes-td">
                  {shoe.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="shoes-td">{shoe.stock}</td>
                <td className="shoes-td">
                  {shoe.stock > 0 ? "In Stock" : "Out of Stock"}
                </td>
                <td className="shoes-td">
                  <button className="shoes-edit-btn" onClick={() => handleEditShoe(shoe)}> {/* Apply a new CSS class for the edit button */}
                    <FaEdit />
                  </button>
                  <button className="shoes-delete-btn" onClick={() => handleDeleteShoe(shoe._id)}> {/* Apply a new CSS class for the delete button */}
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

export default ManageShoes;
