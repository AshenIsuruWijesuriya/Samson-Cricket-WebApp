import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminHeader from "../../AdminHeader/AdminHeader";
import "./CoachUsers.css";
import { FaTrash, FaEnvelope, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import AddCoachUserModal from "../../../../Components/Admin/AddCoachUserModal";

const CoachUsers = () => {
    const [coachUsers, setCoachUsers] = useState([]);
    const [filteredCoachUsers, setFilteredCoachUsers] = useState([]);
    const [searchCoachTerm, setSearchCoachTerm] = useState("");
    const api = process.env.REACT_APP_BASE_URL;
    const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);

    const fetchCoachUsers = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const response = await axios.get(`${api}/api/users/role/Coach`, {});
            setCoachUsers(response.data);
            setFilteredCoachUsers(response.data);
        } catch (error) {
            console.error("Error fetching coaches:", error);
            if (error.response) {
                console.error("API Error Details:", error.response.data);
            }
        }
    }, [api]);

    useEffect(() => {
        fetchCoachUsers();
    }, [fetchCoachUsers]);

    useEffect(() => {
        const results = coachUsers.filter((user) => {
            const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
            return (
                fullName.includes(searchCoachTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchCoachTerm.toLowerCase())
            );
        });
        setFilteredCoachUsers(results);
    }, [searchCoachTerm, coachUsers]);

    const handleDeleteCoachUser = async (userId) => {
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
                    setCoachUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
                    Swal.fire("Deleted!", "Coach has been deleted.", "success");
                    fetchCoachUsers();
                } catch (error) {
                    console.error("Error deleting coach:", error);
                    if (error.response) {
                        console.error("API Error Details:", error.response.data);
                    }
                    Swal.fire("Error!", "Failed to delete coach.", "error");
                }
            }
        });
    };

    const handleSendCoachEmail = (email) => {
        window.open(`mailto:${email}`, "_blank");
    };

    const handleOpenCoachModal = () => {
        setIsCoachModalOpen(true);
    };

    const handleCloseCoachModal = () => {
        setIsCoachModalOpen(false);
    };

    const handleCoachUserAdded = () => {
        fetchCoachUsers();
    };

    return (
        <div className="coach-users-bg">
            <div className="coach-users-content">
                <AdminHeader />
                <div className="navigation-path-admindb">
                    <a href="/admindashboard">Admin Dashboard</a> /
                    <a href="/admindashboard/manage-users">Manage Users</a> / Coach Users
                </div>
                <h2 className="coach-users-title">Manage Coach Users</h2>

                <div className="coach-users-filter-container">
                    <input
                        type="text"
                        placeholder="Search coaches..."
                        value={searchCoachTerm}
                        onChange={(e) => setSearchCoachTerm(e.target.value)}
                        className="coach-users-search-input"
                    />
                    <button onClick={handleOpenCoachModal} className="add-coach-user-link">
                        <FaPlus className="add-coach-user-icon" /> Add New Coach User
                    </button>
                </div>

                {isCoachModalOpen && <AddCoachUserModal onClose={handleCloseCoachModal} onUserAdded={handleCoachUserAdded} />}

                <table className="coach-users-table">
                    <thead className="coach-users-thead">
                        <tr className="coach-users-tr-header">
                            <th className="coach-users-th">First Name</th>
                            <th className="coach-users-th">Last Name</th>
                            <th className="coach-users-th">Email</th>
                            <th className="coach-users-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="coach-users-tbody">
                        {filteredCoachUsers.map((user) => (
                            <tr key={user._id} className="coach-users-tr-data">
                                <td className="coach-users-td">{user.firstname}</td>
                                <td className="coach-users-td">{user.lastname}</td>
                                <td className="coach-users-td">{user.email}</td>
                                <td className="coach-users-td">
                                    <button
                                        className="coach-users-email-btn"
                                        onClick={() => handleSendCoachEmail(user.email)}
                                    >
                                        <FaEnvelope />
                                    </button>
                                    <button
                                        className="coach-users-delete-btn"
                                        onClick={() => handleDeleteCoachUser(user._id)}
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

export default CoachUsers;