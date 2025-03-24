import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserBookings.css";
import MainHeader from "../../../Common/mainHeader";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const api = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchUserEmailAndBookings = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        // 1️⃣ Get user email using userId
        const userRes = await axios.get(`${api}/api/users/${userId}`);
        const userEmail = userRes.data.email;

        // 2️⃣ Get all sessions and filter by user email
        const sessionRes = await axios.get(`${api}/api/coach/sessions`);
        const userSessions = sessionRes.data.filter(
          (session) => session.userEmail === userEmail
        );

        setBookings(userSessions);
      } catch (err) {
        console.error("Error fetching user sessions:", err);
      }
    };

    fetchUserEmailAndBookings();
  }, [api]);

  return (
    <>
    <MainHeader />
    <div className="user-booking-container">
      <h2>Your Coach Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="user-booking-table">
          <thead>
            <tr>
              <th>Coach</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.coachName}</td>
                <td>{b.coachType}</td>
                <td>{new Date(b.preferredDate).toLocaleDateString()}</td>
                <td>{b.preferredTime}</td>
                <td className={`status-${b.status}`}>{b.status}</td>
                <td>{b.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default UserBookings;
