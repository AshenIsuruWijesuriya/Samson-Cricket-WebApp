import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminHeader from "../../AdminHeader/AdminHeader";
import "./ServiceUsers.css"; // Create a new CSS file for service users
import { FaTrash, FaEnvelope, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import AddServiceUserModal from "../../../../Components/Admin/AddServiceUserModal"; // Import the service user modal

const ServiceUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const api = process.env.REACT_APP_BASE_URL;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const response = await axios.get(`${api}/api/users/role/ServiceManager`, {});
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            if (error.response) {
                console.error("API Error Details:", error.response.data);
            }
        }
    }, [api]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        const results = users.filter((user) => {
            const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
            return (
                fullName.includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.serviceType?.toLowerCase().includes(searchTerm.toLowerCase()) // Include service type in search
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
                    fetchUsers();
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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUserAdded = () => {
        fetchUsers();
    };

    return (
        <div className="service-users-bg">
            <div className="service-users-content">
                <AdminHeader />
                <div className="navigation-path-admindb">
                    <a href="/admindashboard">Admin Dashboard</a> /
                    <a href="/admindashboard/manage-users">Manage Users</a> / Service Users
                </div>
                <h2 className="service-users-title">Manage Service Users</h2>

                <div className="service-users-filter-container">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="service-users-search-input"
                    />
                    <button onClick={handleOpenModal} className="add-service-user-link">
                        <FaPlus className="add-service-user-icon" /> Add New Service User
                    </button>
                </div>

                {isModalOpen && <AddServiceUserModal onClose={handleCloseModal} onUserAdded={handleUserAdded} />}

                <table className="service-users-table">
                    <thead className="service-users-thead">
                        <tr className="service-users-tr-header">
                            <th className="service-users-th">First Name</th>
                            <th className="service-users-th">Last Name</th>
                            <th className="service-users-th">Email</th>
                            <th className="service-users-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="service-users-tbody">
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="service-users-tr-data">
                                <td className="service-users-td">{user.firstname}</td>
                                <td className="service-users-td">{user.lastname}</td>
                                <td className="service-users-td">{user.email}</td>
                                <td className="service-users-td">
                                    <button
                                        className="service-users-email-btn"
                                        onClick={() => handleSendEmail(user.email)}
                                    >
                                        <FaEnvelope />
                                    </button>
                                    <button
                                        className="service-users-delete-btn"
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

export default ServiceUsers;