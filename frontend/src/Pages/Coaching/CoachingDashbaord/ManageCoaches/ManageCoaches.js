// ManageCoaches.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminHeader from "../../CoachingHeader/CoachingHeader";
import "./ManageCoaches.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import AddCoachModal from "./AddCoachModal";
import UpdateCoachModal from "./UpdateCoachModal";

const ManageCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [isUpdatingModalOpen, setIsUpdatingModalOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const api = process.env.REACT_APP_BASE_URL;

  const fetchCoaches = useCallback(async () => {
    try {
      const response = await axios.get(`${api}/api/coach`);
      setCoaches(response.data);
      setFilteredCoaches(response.data);
    } catch (error) {
      console.error("Error fetching coaches:", error);
    }
  }, [api]);

  useEffect(() => {
    fetchCoaches();
  }, [fetchCoaches]);

  useEffect(() => {
    const results = coaches.filter((coach) => {
      const searchString = `${coach.name} ${coach.email} ${coach.contactNumber} ${coach.experience} ${coach.coachType.join(
        " "
      )}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    setFilteredCoaches(results);
  }, [searchTerm, coaches]);

  const handleDeleteCoach = async (coachId) => {
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
          await axios.delete(`${api}/api/coach/${coachId}`);
          setCoaches((prevCoaches) =>
            prevCoaches.filter((coach) => coach._id !== coachId)
          );
          Swal.fire("Deleted!", "Coach has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting coach:", error);
          Swal.fire("Error!", "Failed to delete coach.", "error");
        }
      }
    });
  };

  const handleEditCoach = (coach) => {
    setSelectedCoach(coach);
    setIsUpdatingModalOpen(true);
  };

  return (
    <div className="coaches-bg">
      <div className="coaches-content">
        <AdminHeader />
        <div className="navigation-path-admindb">
          <a href="/admindashboard">Admin Dashboard</a> / Manage Coaches
        </div>
        <h2 className="coaches-title">Manage Coaches</h2>

        <div className="coaches-filter-container">
          <input
            type="text"
            placeholder="Search coaches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="coaches-search-input"
          />
        </div>

        <button onClick={() => setIsAddingModalOpen(true)} className="add-coach-button">
          Add New Coach
        </button>

        {isAddingModalOpen && (
          <AddCoachModal
            onClose={() => setIsAddingModalOpen(false)}
            onCoachAdded={fetchCoaches}
          />
        )}

        {isUpdatingModalOpen && selectedCoach && (
          <UpdateCoachModal
            coach={selectedCoach}
            onClose={() => setIsUpdatingModalOpen(false)}
            onCoachUpdated={fetchCoaches}
          />
        )}

        <table className="coaches-table">
          <thead className="coaches-thead">
            <tr className="coaches-tr-header">
              <th>Images</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="coaches-tbody">
            {filteredCoaches.map((coach) => (
              <tr key={coach._id}>
                <td>
                  {coach.images?.map((img, index) => (
                    <img
                      key={index}
                      src={`${api}/uploads/${img}`}
                      alt="coach"
                      className="coach-preview-image"
                    />
                  ))}
                </td>
                <td>{coach.name}</td>
                <td>{coach.email}</td>
                <td>{coach.contactNumber}</td>
                <td>{coach.experience}</td>
                <td>{coach.status}</td>
                <td>{coach.coachType.join(", ")}</td>
                <td>{coach.description}</td>
                <td>
                  <button className="coaches-edit-btn" onClick={() => handleEditCoach(coach)}>
                    <FaEdit />
                  </button>
                  <button className="coaches-delete-btn" onClick={() => handleDeleteCoach(coach._id)}>
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

export default ManageCoaches;
