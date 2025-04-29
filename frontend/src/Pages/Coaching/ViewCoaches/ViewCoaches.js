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
    <div className="coach-search-container">
      <h1 className="coach-search-title">Available Coaches</h1>
      <p className="coach-search-subtitle">
        Explore our selection of professional coaches ready to help you achieve your goals
      </p>
      
      <div className="coach-search-filters">
        <div className="coach-search-input-container">
          <input
            type="text"
            placeholder="Search by coach name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="coach-search-input"
          />
        </div>
        
        <div className="coach-type-filter-container">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="coach-type-filter"
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
        <div className="coach-loading-message">Loading coaches...</div>
      ) : filteredCoaches.length > 0 ? (
        <div className="coach-card-grid">
          {filteredCoaches.map((coach) => (
            <div key={coach._id} className="coach-card">
              <div className="coach-image-container">
                <img 
                  src={`${api}/uploads/${coach.images[0]}`} 
                  alt={coach.name} 
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/280x220?text=Coach";
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
        <div className="coach-no-results-message">
          No coaches found matching your search criteria.
        </div>
      )}
    </div>
    </>
  );
};

export default ViewCoaches;