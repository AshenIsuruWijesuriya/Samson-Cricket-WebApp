import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AdminSessions.css";
import CoachingHeader from "../../CoachingHeader/CoachingHeader";

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingSession, setEditingSession] = useState(null);
  const [editForm, setEditForm] = useState({
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });
  const api = process.env.REACT_APP_BASE_URL;

  const fetchSessions = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/api/coach/sessions`);
      setSessions(res.data);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  }, [api]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleUpdateStatus = async (coachId, sessionId, status) => {
    try {
      await axios.put(`${api}/api/coach/${coachId}/sessions/${sessionId}`, {
        status,
      });
      fetchSessions();
    } catch (err) {
      console.error("Error updating session:", err);
    }
  };

  const handleDelete = async (coachId, sessionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This session will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${api}/api/coach/${coachId}/sessions/${sessionId}`);
          fetchSessions();
          Swal.fire("Deleted!", "Session deleted successfully.", "success");
        } catch (err) {
          console.error("Error deleting session:", err);
          Swal.fire("Error!", "Failed to delete session.", "error");
        }
      }
    });
  };


  const handleEditClick = (session) => {
    setEditingSession(session);
    setEditForm({
      preferredDate: session.preferredDate?.split("T")[0] || "",
      preferredTime: session.preferredTime || "",
      notes: session.notes || "",
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`${api}/api/coach/${editingSession.coachId}/sessions/${editingSession._id}`, {
        preferredDate: editForm.preferredDate,
        preferredTime: editForm.preferredTime,
        notes: editForm.notes,
      });
      setEditingSession(null);
      fetchSessions();
      Swal.fire("Updated!", "Session details updated successfully.", "success");
    } catch (err) {
      console.error("Error updating session:", err);
      Swal.fire("Error!", "Failed to update session.", "error");
    }
  };

  const filteredSessions =
    filter === "all" ? sessions : sessions.filter((s) => s.status === filter);

  return (
    <>
    <CoachingHeader />
    <div className="admin-session-container">
      <h2>Manage Coach Session Bookings</h2>

      <div className="session-filter">
        <label>Filter by Status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <table className="session-table">
        <thead>
          <tr>
            <th>Coach</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSessions.map((s) => (
            <tr key={s._id}>
              <td>{s.coachName}</td>
              <td>{s.userName}</td>
              <td>{s.userEmail}</td>
              <td>{s.userPhone}</td>
              <td>{s.coachType}</td>
              <td>{new Date(s.preferredDate).toLocaleDateString()}</td>
              <td>{s.preferredTime}</td>
              <td>{s.status}</td>
              <td>
                {s.status === "pending" && (
                  <>
                    <button className="approve-btn" onClick={() => handleUpdateStatus(s.coachId, s._id, "approved")}>Approve</button>
                    <button className="reject-btn" onClick={() => handleUpdateStatus(s.coachId, s._id, "rejected")}>Reject</button>
                  </>
                )}
                {s.status === "approved" && (
                  <button className="edit-btn" onClick={() => handleEditClick(s)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => handleDelete(s.coachId, s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingSession && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Session</h3>
            <label>Date:
              <input type="date" name="preferredDate" value={editForm.preferredDate} onChange={handleEditChange} />
            </label>
            <label>Time:
              <input type="time" name="preferredTime" value={editForm.preferredTime} onChange={handleEditChange} />
            </label>
            <label>Notes:
              <textarea name="notes" value={editForm.notes} onChange={handleEditChange} />
            </label>
            <div className="modal-actions">
              <button onClick={handleEditSubmit} className="approve-btn">Save</button>
              <button onClick={() => setEditingSession(null)} className="reject-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminSessions;