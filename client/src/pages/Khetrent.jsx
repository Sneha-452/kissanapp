
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Warehouse.css"; 

function Khetrent() {
  const navigate = useNavigate();
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);

  const [filters, setFilters] = useState({
    state: "",
    district: "",
    landType: "",
    minRent: "",
    maxRent: ""
  });

  const locationData = {
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Maharashtra": ["Nagpur", "Mumbai", "Pune", "Nashik", "Aurangabad"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    "Haryana": ["Karnal", "Ambala", "Gurugram", "Hisar", "Rohtak"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"]
  };

  const fetchLands = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.state) queryParams.append("state", filters.state);
      if (filters.district) queryParams.append("district", filters.district);
      if (filters.landType) queryParams.append("landType", filters.landType);
      if (filters.minRent) queryParams.append("minRent", filters.minRent);
      if (filters.maxRent) queryParams.append("maxRent", filters.maxRent);

      const res = await fetch(`http://localhost:5000/api/lands?${queryParams.toString()}`);
      const result = await res.json();
      if (result.success) {
        setLands(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching lands:", error);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  return (
    <div className="warehouse-page">
      <div className="warehouse-hero">
        <h1>Farm Land on Rent</h1>
        <p>Find fertile agricultural land at your desired location</p>
      </div>

      <div className="main-content">
        {/*  SEARCHABLE FILTERS */}
        <div className="filter-card">
          <h4>Filter Lands</h4>
          <div className="filter-row">
            <div className="input-group">
              <label>State</label>
              <select 
                value={filters.state} 
                onChange={(e) => setFilters({...filters, state: e.target.value, district: ""})}
              >
                <option value="">Select State</option>
                {Object.keys(locationData).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            
            <div className="input-group">
              <label>District / City</label>
              <input 
                list="land-city-list"
                placeholder="Type or Select City"
                value={filters.district}
                disabled={!filters.state}
                onChange={(e) => setFilters({...filters, district: e.target.value})}
              />
              <datalist id="land-city-list">
                {filters.state && locationData[filters.state].map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div className="input-group">
              <label>Land Type</label>
              <select value={filters.landType} onChange={(e) => setFilters({...filters, landType: e.target.value})}>
                <option value="">All Types</option>
                <option value="Irrigated">Irrigated</option>
                <option value="Non-Irrigated">Non-Irrigated</option>
                <option value="Rainfed">Rainfed</option>
              </select>
            </div>
          </div>

          <div className="filter-row second-row">
            <div className="input-group capacity">
              <label>Rent Range (₹)</label>
              <div className="range-wrap">
                <input type="number" placeholder="Min" value={filters.minRent} onChange={(e) => setFilters({...filters, minRent: e.target.value})} />
                <input type="number" placeholder="Max" value={filters.maxRent} onChange={(e) => setFilters({...filters, maxRent: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="filter-buttons">
            <button className="btn-apply" onClick={fetchLands}>Apply Filter</button>
            <button className="btn-reset" onClick={() => {
              setFilters({state: "", district: "", landType: "", minRent: "", maxRent: ""});
              window.location.reload();
            }}>Reset Filters</button>
          </div>
        </div>

        <h3 className="list-title">Available Land Listings</h3>
        
        {/*  GRID VIEW */}
        <div className="warehouse-grid">
          {lands.length > 0 ? (
            lands.map((land) => (
              <div className="w-card" key={land._id}>
                <span className="w-tag">{land.landType}</span>
                <img src={land.imageUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000"} alt="Land" />
                <div className="w-info">
                  <h4>📍 {land.village}, {land.district}</h4>
                  <p className="w-loc">{land.state}</p>
                  <div className="w-details">
                    <p>Area: <strong>{land.area} Acre</strong></p>
                    <p>Duration: <strong>{land.duration}</strong></p>
                    <p>Rent: <strong>₹{land.rentAmount}</strong> / {land.rentUnit}</p>
                  </div>
                  <div className="w-btns">
                    <button className="btn-v" onClick={() => setSelectedLand(land)}>View Details</button>
                    <a href={`tel:${land.ownerPhone}`} className="btn-r" style={{textDecoration:'none', textAlign:'center'}}>📞 Call Owner</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-box">
              <h4>No lands available matching your search.</h4>
            </div>
          )}
        </div>

        {/* DETAILS MODAL */}
        {selectedLand && (
          <div className="modal-overlay" onClick={() => setSelectedLand(null)}>
            <div className="modal-square" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={() => setSelectedLand(null)}>&times;</button>
              <div className="modal-inner-grid">
                <div className="modal-image-container">
                  <img src={selectedLand.imageUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000"} alt="Land" />
                </div>
                <div className="modal-details-container">
                  <h2>Land Details</h2>
                  <p className="modal-location">📍 {selectedLand.village}, {selectedLand.district}, {selectedLand.state}</p>
                  <div className="modal-stats-grid">
                    <div className="stat-item"><strong>Type:</strong> {selectedLand.landType}</div>
                    <div className="stat-item"><strong>Area:</strong> {selectedLand.area} Acre</div>
                    <div className="stat-item"><strong>Rent:</strong> ₹{selectedLand.rentAmount}</div>
                    <div className="stat-item"><strong>Duration:</strong> {selectedLand.duration}</div>
                  </div>
                  <div className="owner-box">
                    <h4>👤 Owner Details</h4>
                    <p><strong>Name:</strong> {selectedLand.ownerName}</p>
                    <a href={`tel:${selectedLand.ownerPhone}`} className="modal-call-link">📞 Call {selectedLand.ownerPhone}</a>
                  </div>
                  {selectedLand.about && (
                    <div className="about-box">
                      <strong>About Land:</strong>
                      <p>{selectedLand.about}</p>
                    </div>
                  )}
                  <div className="modal-action-footer">
                    <button className="btn-r full-width" onClick={() => window.location.href = `tel:${selectedLand.ownerPhone}`}>Confirm & Rent Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="add-btn-container">
          <button className="floating-add-btn" onClick={() => navigate("/khetrent/add")}>➕ List Your Land</button>
        </div>
      </div>
    </div>
  );
}

export default Khetrent;
