import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageRepair.css";
import ServiceManagerHeader from "../ServicemanagerHeader/ServiceManagerHeader";
import { FaEnvelope, FaWhatsapp, FaDownload } from "react-icons/fa";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import jspdf-autotable  - ADD THIS LINE

const api = process.env.REACT_APP_BASE_URL;

const ManageRepair = () => {
  const [repairRequests, setRepairRequests] = useState([]);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchRepairRequests = async () => {
      try {
        const response = await axios.get(api + "/api/services/repair-requests");
        setRepairRequests(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch repair requests.");
      }
    };

    fetchRepairRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(api + `/api/services/update-repair-status/${id}`, {
        status: newStatus,
      });
      setRepairRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: newStatus } : request
        )
      );
      Swal.fire(
        "Status Updated",
        "Repair request status updated successfully.",
        "success"
      );
    } catch (err) {
      setError(err.message || "Failed to update status.");
      Swal.fire("Error", "Failed to update repair request status.", "error");
    }
  };

  const handleSendEmail = (email) => {
    window.open(`mailto:${email}`, "_blank");
  };

  const handleWhatsAppChat = (phoneNumber) => {
    const cleanedPhoneNumber = phoneNumber.replace(/[^0-9+]/g, "");

    if (cleanedPhoneNumber.startsWith("+94")) {
      window.open(`https://wa.me/${cleanedPhoneNumber}`, "_blank");
    } else if (cleanedPhoneNumber.startsWith("0")) {
      const sriLankanNumber = "+94" + cleanedPhoneNumber.substring(1);
      window.open(`https://wa.me/${sriLankanNumber}`, "_blank");
    } else {
      Swal.fire(
        "Error",
        "Phone number must start with +94 or 0 (Sri Lanka).",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
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
          await axios.delete(api + `/api/services/delete-repair/${id}`);
          setRepairRequests((prevRequests) =>
            prevRequests.filter((request) => request._id !== id)
          );
          Swal.fire(
            "Deleted!",
            "Your repair request has been deleted.",
            "success"
          );
        } catch (err) {
          setError(err.message || "Failed to delete repair request.");
          Swal.fire("Error", "Failed to delete repair request.", "error");
        }
      }
    });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
    });
  };

  const filteredRequests = filterStatus === "All"
    ? repairRequests
    : repairRequests.filter((request) => request.status === filterStatus);

  const downloadSummaryPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Email", "Phone", "Type", "Details", "Status", "Request Date"];
    const tableRows = [];

    filteredRequests.forEach((request) => {
      const tableData = [
        `${request.firstName} ${request.lastName}`,
        request.email,
        request.phoneNumber,
        request.repairType,
        request.details,
        request.status,
        formatDate(request.createdAt),
      ];
      tableRows.push(tableData);
    });

    doc.autoTable({ // Now this should work
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`repair_requests_summary_${filterStatus.toLowerCase()}.pdf`);
  };

  return (
    <div>
      <ServiceManagerHeader />
      <div className="repair-management-container">
        <h2 className="repair-management-title">Manage Repair Requests</h2>
        <div className="filter-buttons">
          <button
            className={`filter-button ${filterStatus === "All" ? "active" : ""}`}
            onClick={() => setFilterStatus("All")}
          >
            All
          </button>
          <button
            className={`filter-button ${filterStatus === "Pending" ? "active" : ""}`}
            onClick={() => setFilterStatus("Pending")}
          >
            Pending
          </button>
          <button
            className={`filter-button ${filterStatus === "Accepted" ? "active" : ""}`}
            onClick={() => setFilterStatus("Accepted")}
          >
            Accepted
          </button>
          <button
            className={`filter-button ${filterStatus === "Cancelled" ? "active" : ""}`}
            onClick={() => setFilterStatus("Cancelled")}
          >
            Cancelled
          </button>
          <button
            className={`filter-button ${filterStatus === "In Progress" ? "active" : ""}`}
            onClick={() => setFilterStatus("In Progress")}
          >
            In Progress
          </button>
          <button
            className={`filter-button ${filterStatus === "Completed" ? "active" : ""}`}
            onClick={() => setFilterStatus("Completed")}
          >
            Completed
          </button>
        </div>

        <button className="download-summary-button" onClick={downloadSummaryPDF}>
          <FaDownload /> Download Summary ({filterStatus})
        </button>

        {filteredRequests.length === 0 ? (
          <p className="repair-management-no-requests">
            No repair requests found.
          </p>
        ) : (
          <table className="repair-management-table">
            <thead className="repair-management-thead">
              <tr className="repair-management-tr">
                <th className="repair-management-th">Name</th>
                <th className="repair-management-th">Email</th>
                <th className="repair-management-th">Phone</th>
                <th className="repair-management-th">Type</th>
                <th className="repair-management-th">Details</th>
                <th className="repair-management-th">Status</th>
                <th className="repair-management-th">Request Date</th>
                <th className="repair-management-th">Actions</th>
              </tr>
            </thead>
            <tbody className="repair-management-tbody">
              {filteredRequests.map((request) => (
                <tr key={request._id} className="repair-management-tr">
                  <td className="repair-management-td">
                    {request.firstName} {request.lastName}
                  </td>
                  <td className="repair-management-td">{request.email}</td>
                  <td className="repair-management-td">
                    {request.phoneNumber}
                  </td>
                  <td className="repair-management-td">{request.repairType}</td>
                  <td className="repair-management-td">{request.details}</td>
                  <td className="repair-management-td">
                    <select
                      value={request.status}
                      onChange={(e) =>
                        handleStatusChange(request._id, e.target.value)
                      }
                      className="repair-management-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="repair-management-td">
                    {formatDate(request.createdAt)}
                  </td>
                  <td className="repair-management-td">
                    <div className="repair-management-actions">
                      <button
                        className="repair-management-email-btn"
                        onClick={() => handleSendEmail(request.email)}
                      >
                        <FaEnvelope />
                      </button>
                      <button
                        className="repair-management-whatsapp-btn"
                        onClick={() => handleWhatsAppChat(request.phoneNumber)}
                      >
                        <FaWhatsapp />
                      </button>
                      <button
                        className="repair-management-delete-btn"
                        onClick={() => handleDelete(request._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageRepair;

