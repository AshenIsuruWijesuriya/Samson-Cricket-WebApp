import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewCoaches.css";
import MainHeader from "../../../Common/mainHeader";

const ViewCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const api = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`${api}/api/coach`)
      .then((res) => {
        const availableCoaches = res.data.filter((c) => c.status === "available");
        setCoaches(availableCoaches);
        setFilteredCoaches(availableCoaches);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coaches:", error);
        setLoading(false);
      });
  }, [api]);

  useEffect(() => {
    let filtered = [...coaches];
    
    if (searchTerm) {
      filtered = filtered.filter(coach => 
        coach.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedType) {
      filtered = filtered.filter(coach => 
        coach.coachType.some(type => 
          type.toLowerCase().includes(selectedType.toLowerCase())
        )
      );
    }
    
    setFilteredCoaches(filtered);
  }, [searchTerm, selectedType, coaches]);

  const handleViewDetails = (id) => {
    navigate(`/coach/${id}`);
  };

  // Get unique coaching types from all coaches
  const uniqueTypes = [...new Set(coaches.flatMap(coach => coach.coachType))];

  return (
    <>
    <MainHeader />
    <div className="coach-view-container">
      <h1 className="coach-view-title">Available Coaches</h1>
      <p className="coach-view-subtitle">
        Explore our selection of professional coaches ready to help you achieve your goals
      </p>
      
      <div className="coach-view-filters">
        <div className="coach-view-search-container">
          <input
            type="text"
            placeholder="Search by coach name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="coach-view-search-input"
          />
        </div>
        
        <div className="coach-view-type-container">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="coach-view-type-select"
          >
            <option value="">All Coaching Types</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="coach-view-loading">Loading coaches...</div>
      ) : filteredCoaches.length > 0 ? (
        <div className="coach-view-grid">
          {filteredCoaches.map((coach) => (
            <div key={coach._id} className="coach-view-card">
              <div className="coach-view-image-wrapper">
                <img 
                  src={`${api}/uploads/${coach.images[0]}`} 
                  alt={coach.name} 
                  className="coach-view-image"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/280x220?text=Coach";
                  }}
                />
              </div>
              <div className="coach-view-info">
                <h3 className="coach-view-name">{coach.name}</h3>
                <p className="coach-view-type">{coach.coachType.join(", ")}</p>
                <button 
                  className="coach-view-button"
                  onClick={() => handleViewDetails(coach._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="coach-view-empty">
          No coaches found matching your search criteria.
        </div>
      )}
    </div>
    </>
  );
};

export default ViewCoaches;