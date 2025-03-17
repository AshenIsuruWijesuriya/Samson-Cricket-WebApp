import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../AdminHeader/AdminHeader";
import "./CustomerUsers.css";
import { FaTrash, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const CustomerUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const api = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(`${api}/api/users/role/Normal`, {});

        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with all users
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response) {
          console.error("API Error Details:", error.response.data);
        }
      }
    };

    fetchUsers();
  }, [api]);

  useEffect(() => {
    const results = users.filter((user) => {
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleDeleteUser = async (userId) => {
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
          const token = localStorage.getItem("token");

          if (!token) {
            console.error("No token found");
            return;
          }

          await axios.delete(`${api}/api/users/${userId}`, {});

          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting user:", error);
          if (error.response) {
            console.error("API Error Details:", error.response.data);
          }
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };

  const handleSendEmail = (email) => {
    window.open(`mailto:${email}`, "_blank");
  };

  return (
    <div className="customer-users-bg">
      <div className="customer-users-content">
        <AdminHeader />
        <div className="navigation-path-admindb">
          <a href="/admindashboard">Admin Dashboard</a> /{" "}
          <a href="/admindashboard/manage-users">Manage Users</a> / Customer
          Users
        </div>
        <h2 className="customer-users-title">Manage Customer Users</h2>

        <div className="customer-users-filter-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="customer-users-search-input"
          />
        </div>

        <table className="customer-users-table">
          <thead className="customer-users-thead">
            <tr className="customer-users-tr-header">
              <th className="customer-users-th">First Name</th>
              <th className="customer-users-th">Last Name</th>
              <th className="customer-users-th">Email</th>
              <th className="customer-users-th">Action</th>
            </tr>
          </thead>
          <tbody className="customer-users-tbody">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="customer-users-tr-data">
                <td className="customer-users-td">{user.firstname}</td>
                <td className="customer-users-td">{user.lastname}</td>
                <td className="customer-users-td">{user.email}</td>
                <td className="customer-users-td">
                <button
                    className="customer-users-email-btn" // Add email button
                    onClick={() => handleSendEmail(user.email)}
                  >
                    <FaEnvelope />
                  </button>
                  <button
                    className="customer-users-delete-btn"
                    onClick={() => handleDeleteUser(user._id)}
                  >
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

export default CustomerUsers;