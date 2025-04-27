import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminHeader from "../../AdminHeader/AdminHeader";
import "./ManageMerch.css";
import { FaTrash, FaEdit, FaDownload, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import AddMerchModal from "../../../../Components/Admin/ManageMerch/AddMerchModal";
import UpdateMerchModal from "../../../../Components/Admin/ManageMerch/UpdateMerchModal";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ManageMerch = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [filteredMerchandise, setFilteredMerchandise] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [isUpdatingModalOpen, setIsUpdatingModalOpen] = useState(false);
  const [selectedMerch, setSelectedMerch] = useState(null);
  const api = process.env.REACT_APP_BASE_URL;

  const fetchMerchandise = useCallback(async () => {
    try {
      const response = await axios.get(`${api}/api/merch`);
      setMerchandise(response.data);
      setFilteredMerchandise(response.data);
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
    setFilteredMerchandise(results);
  }, [searchTerm, merchandise]);

  const handleDeleteMerch = async (merchId) => {
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
          await axios.delete(`${api}/api/merch/${merchId}`);
          setMerchandise((prevMerch) => prevMerch.filter((merch) => merch._id !== merchId));
          Swal.fire("Deleted!", "Merchandise has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting merchandise:", error);
          Swal.fire("Error!", "Failed to delete merchandise.", "error");
        }
      }
    });
  };

  const handleEditMerch = (merch) => {
    setSelectedMerch(merch);
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
    setSelectedMerch(null);
  };

  const handleMerchAdded = () => {
    fetchMerchandise();
  };

  const handleMerchUpdated = () => {
    fetchMerchandise();
  };

  const downloadMerchPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Name",
      "Category",
      "Brand",
      "Size",
      "Price (LKR)",
      "Stock",
      "Status",
    ];
    const tableRows = [];

    filteredMerchandise.forEach((merch) => {
      const tableData = [
        merch.name,
        merch.category,
        merch.brand,
        merch.size,
        merch.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        merch.stock,
        merch.stock > 0 ? "In Stock" : "Out of Stock",
      ];
      tableRows.push(tableData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("merchandise_report.pdf");
  };

  return (
    <div className="merch-bg">
      <div className="merch-content">
        <AdminHeader />
        <div className="navigation-path-admindb">
          <a href="/admindashboard">Admin Dashboard</a> /{" "}
          <a href="/admindashboard/manage-inventory">Manage Inventory</a> / Manage Merchandise
        </div>
        <h2 className="merch-title">Manage Merchandise</h2>

        <div className="merch-filter-container">
          <input
            type="text"
            placeholder="Search merchandise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="merch-search-input"
          />
        </div>

        <button onClick={handleOpenAddModal} className="add-merch-button">
          <FaPlus className="button-icon" />
          Add New Merchandise
        </button>
        <button className="download-merch-button" onClick={downloadMerchPDF}>
          <FaDownload className="button-icon" />
          Download Report
        </button>

        {isAddingModalOpen && (
          <AddMerchModal onClose={handleCloseAddModal} onMerchAdded={handleMerchAdded} />
        )}

        {isUpdatingModalOpen && (
          <UpdateMerchModal merch={selectedMerch} onClose={handleCloseUpdateModal} onMerchUpdated={handleMerchUpdated} />
        )}

        <table className="merch-table">
          <thead className="merch-thead">
            <tr className="merch-tr-header">
              <th className="merch-th">Merch Image</th>
              <th className="merch-th">Name</th>
              <th className="merch-th">Category</th>
              <th className="merch-th">Brand</th>
              <th className="merch-th">Size</th>
              <th className="merch-th">Price (LKR)</th>
              <th className="merch-th">Stock Count</th>
              <th className="merch-th">Status</th>
              <th className="merch-th">Action</th>
            </tr>
          </thead>
          <tbody className="merch-tbody">
            {filteredMerchandise.map((merch) => (
              <tr key={merch._id} className="merch-tr-data">
                <td className="merch-td">
                  {merch.images && merch.images.length > 0 && (
                    <img
                      src={`${api}/uploads/${merch.images[0]}`}
                      alt={merch.name}
                      className="merch-preview-image"
                    />
                  )}
                </td>
                <td className="merch-td">{merch.name}</td>
                <td className="merch-td">{merch.category}</td>
                <td className="merch-td">{merch.brand}</td>
                <td className="merch-td">{merch.size}</td>
                <td className="merch-td">
                  {merch.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="merch-td">{merch.stock}</td>
                <td className="merch-td">
                  {merch.stock > 0 ? "In Stock" : "Out of Stock"}
                </td>
                <td className="merch-td">
                  <button className="merch-edit-btn" onClick={() => handleEditMerch(merch)}>
                    <FaEdit />
                  </button>
                  <button className="merch-delete-btn" onClick={() => handleDeleteMerch(merch._id)}>
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

export default ManageMerch;

