import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminHeader from "../../AdminHeader/AdminHeader";
import "./ManageShoes.css";
import { FaTrash, FaEdit, FaDownload, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import AddShoeModal from "../../../../Components/Admin/ManageShoes/AddShoeModel";
import UpdateShoeModal from "../../../../Components/Admin/ManageShoes/UpdateShoeModal";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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

  const downloadShoesPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Brand",
      "Model",
      "Size",
      "Price (LKR)",
      "Stock",
      "Status",
    ];
    const tableRows = [];

    filteredShoes.forEach((shoe) => {
      const tableData = [
        shoe.brand,
        shoe.model,
        shoe.size,
        shoe.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        shoe.stock,
        shoe.stock > 0 ? "In Stock" : "Out of Stock",
      ];
      tableRows.push(tableData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("shoes_inventory_report.pdf");
  };

  return (
    <div className="shoes-bg">
      <div className="shoes-content">
        <AdminHeader />
        <div className="navigation-path-admindb">
          <a href="/admindashboard">Admin Dashboard</a> /{" "}
          <a href="/admindashboard/manage-inventory">Manage Inventory</a> / Manage Shoes
        </div>
        <h2 className="shoes-title">Manage Shoes</h2>

        <div className="shoes-filter-container">
          <input
            type="text"
            placeholder="Search shoes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shoes-search-input"
          />
        </div>

        <button onClick={handleOpenAddModal} className="add-shoe-button">
          <FaPlus className="button-icon" />
          Add New Shoe
        </button>
        <button className="download-shoes-button" onClick={downloadShoesPDF}>
          <FaDownload className="button-icon" />
          Download Report
        </button>

        {isAddingModalOpen && (
          <AddShoeModal onClose={handleCloseAddModal} onShoeAdded={handleShoeAdded} />
        )}

        {isUpdatingModalOpen && (
          <UpdateShoeModal shoe={selectedShoe} onClose={handleCloseUpdateModal} onShoeUpdated={handleShoeUpdated} />
        )}

        <table className="shoes-table">
          <thead className="shoes-thead">
            <tr className="shoes-tr-header">
              <th className="shoes-th">Shoe Image</th>
              <th className="shoes-th">Brand</th>
              <th className="shoes-th">Model</th>
              <th className="shoes-th">Size</th>
              <th className="shoes-th">Price (LKR)</th>
              <th className="shoes-th">Stock Count</th>
              <th className="shoes-th">Status</th>
              <th className="shoes-th">Action</th>
            </tr>
          </thead>
          <tbody className="shoes-tbody">
            {filteredShoes.map((shoe) => (
              <tr key={shoe._id} className="shoes-tr-data">
                <td className="shoes-td">
                  {shoe.images && shoe.images.length > 0 && (
                    <img
                      src={`${api}/uploads/${shoe.images[0]}`}
                      alt={shoe.model}
                      className="shoe-preview-image"
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
                  <button className="shoes-edit-btn" onClick={() => handleEditShoe(shoe)}>
                    <FaEdit />
                  </button>
                  <button className="shoes-delete-btn" onClick={() => handleDeleteShoe(shoe._id)}>
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
