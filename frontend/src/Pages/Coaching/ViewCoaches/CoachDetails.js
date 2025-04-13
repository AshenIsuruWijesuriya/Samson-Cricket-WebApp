import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./CoachDetails.css";
import MainHeader from "../../../Common/mainHeader";

const CoachDetails = () => {
  const { id } = useParams();
  const api = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [coach, setCoach] = useState(null);
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      Swal.fire("Please sign in to book a coach.");
      navigate("/signIn");
      return;
    }

    // Fetch coach details
    axios.get(`${api}/api/coach/${id}`).then((res) => setCoach(res.data));

    // Fetch user data
    axios.get(`${api}/api/users/${userId}`).then((res) => {
      const user = res.data;
      setForm((prev) => ({
        ...prev,
        userName: user.firstname + " " + user.lastname,
        userEmail: user.email,
        userPhone: user.phone || "",
      }));
    });
  }, [id, api, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { userName, userEmail, userPhone, preferredDate, preferredTime } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!userName.trim() || !userEmail.trim() || !userPhone.trim() || !preferredDate || !preferredTime) {
      Swal.fire("Please fill in all required fields.");
      return false;
    }
    if (!emailRegex.test(userEmail)) {
      Swal.fire("Invalid email format.");
      return false;
    }
    if (!phoneRegex.test(userPhone)) {
      Swal.fire("Phone number must be 10 digits.");
      return false;
    }
    const today = new Date().toISOString().split("T")[0];
    if (preferredDate < today) {
      Swal.fire("Preferred date cannot be in the past.");
      return false;
    }
    return true;
  };

  const handleBook = async () => {
    if (!validateForm()) return;

    try {
      if (coach.coachType.includes("online coaching")) {
        await axios.post(`${api}/api/coach/${coach._id}/sessions`, {
          ...form,
          coachType: coach.coachType[0],
        });
        Swal.fire("Session booked! Await admin approval.");
        navigate("/payment", { state: { coachId: coach._id, ...form } });
      } else {
        await axios.post(`${api}/api/coach/${coach._id}/sessions`, {
          ...form,
          coachType: coach.coachType[0],
        });
        Swal.fire("Session booked! Await admin approval.");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to book session. Please try again.", "error");
      console.error("Booking error:", err);
    }
  };

  if (!coach) return <div>Loading...</div>;

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <>
    <MainHeader />
    <div className="coach-details-container">
      <div className="coach-info">
        <h2>{coach.name}</h2>
        <p>{coach.description}</p>
        <p><strong>Types:</strong> {coach.coachType.join(", ")}</p>
      </div>

      <div className="booking-section">
        <h3 className="booking-title">Book a Session</h3>
        <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="userName"
            placeholder="Your Name"
            value={form.userName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="userEmail"
            placeholder="Your Email"
            value={form.userEmail}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="userPhone"
            placeholder="Your Phone"
            value={form.userPhone}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="preferredDate"
            min={minDate}
            value={form.preferredDate}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="preferredTime"
            value={form.preferredTime}
            onChange={handleChange}
            required
          />
          <textarea
            name="notes"
            placeholder="Any specific notes?"
            value={form.notes}
            onChange={handleChange}
          ></textarea>
          <button type="submit" onClick={handleBook}>Book Session</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default CoachDetails;