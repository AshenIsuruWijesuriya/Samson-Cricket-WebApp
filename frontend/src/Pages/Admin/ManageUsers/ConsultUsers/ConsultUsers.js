import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminHeader from "../../AdminHeader/AdminHeader";
import "./ConsultUsers.css";
import { FaTrash, FaEnvelope, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import AddConsultUserModal from "../../../../Components/Admin/AddConsultUserModal";

const ConsultUsers = () => {
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
            const response = await axios.get(`${api}/api/users/role/Consultant`, {});
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error("Error fetching consultants:", error);
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
                    Swal.fire("Deleted!", "Consultant has been deleted.", "success");
                    fetchUsers();
                } catch (error) {
                    console.error("Error deleting consultant:", error);
                    if (error.response) {
                        console.error("API Error Details:", error.response.data);
                    }
                    Swal.fire("Error!", "Failed to delete consultant.", "error");
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
        <div className="admin-users-bg">
            <div className="admin-users-content">
                <AdminHeader />
                <div className="navigation-path-admindb">
                    <a href="/admindashboard">Admin Dashboard</a> /
                    <a href="/admindashboard/manage-users">Manage Users</a> / Consult Users
                </div>
                <h2 className="admin-users-title">Manage Consultant Users</h2>

                <div className="admin-users-filter-container">
                    <input
                        type="text"
                        placeholder="Search consultants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="admin-users-search-input"
                    />
                    <button onClick={handleOpenModal} className="add-admin-user-link">
                        <FaPlus className="add-admin-user-icon" /> Add New Consultant User
                    </button>
                </div>

                {isModalOpen && <AddConsultUserModal onClose={handleCloseModal} onUserAdded={handleUserAdded} />}

                <table className="admin-users-table">
                    <thead className="admin-users-thead">
                        <tr className="admin-users-tr-header">
                            <th className="admin-users-th">First Name</th>
                            <th className="admin-users-th">Last Name</th>
                            <th className="admin-users-th">Email</th>
                            <th className="admin-users-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="admin-users-tbody">
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="admin-users-tr-data">
                                <td className="admin-users-td">{user.firstname}</td>
                                <td className="admin-users-td">{user.lastname}</td>
                                <td className="admin-users-td">{user.email}</td>
                                <td className="admin-users-td">
                                    <button
                                        className="admin-users-email-btn"
                                        onClick={() => handleSendEmail(user.email)}
                                    >
                                        <FaEnvelope />
                                    </button>
                                    <button
                                        className="admin-users-delete-btn"
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

export default ConsultUsers;