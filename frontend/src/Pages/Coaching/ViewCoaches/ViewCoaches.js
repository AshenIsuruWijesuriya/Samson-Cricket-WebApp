import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewCoaches.css";
import MainHeader from "../../../Common/mainHeader";

const ViewCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`${api}/api/coach`)
      .then((res) => {
        const availableCoaches = res.data.filter((c) => c.status === "available");
        setCoaches(availableCoaches);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coaches:", error);
        setLoading(false);
      });
  }, [api]);

  const handleViewDetails = (id) => {
    navigate(`/coach/${id}`);
  };

  return (
    <>
    <MainHeader />
    <div className="coaches-container">
      <h1 className="coaches-title1">Available Coaches</h1>
      <p className="coaches-subtitle">
        Explore our selection of professional coaches ready to help you achieve your goals
      </p>
      
      {loading ? (
        <div className="no-coaches-message">Loading coaches...</div>
      ) : coaches.length > 0 ? (
        <div className="coach-card-grid">
          {coaches.map((coach) => (
            <div key={coach._id} className="coach-card">
              <div className="coach-image-container">
                <img 
                  src={`${api}/uploads/${coach.images[0]}`} 
                  alt={coach.name} 
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/280x220?text=Coach"; // Fallback image
                  }}
                />
              </div>
              <div className="coach-card-content">
                <h3>{coach.name}</h3>
                <p>{coach.coachType.join(", ")}</p>
              </div>
              <button 
                className="coach-view-details"
                onClick={() => handleViewDetails(coach._id)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-coaches-message">
          No coaches are currently available. Please check back later.
        </div>
      )}
    </div>
    </>
  );
};

export default ViewCoaches;