import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Warehouse.css"; 

function Machinery() {
  const navigate = useNavigate();
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  // 1. Advance Filter State
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    category: "",
    minRent: "",
    maxRent: ""
  });

  // 2. Searchable Location Data
  const locationData = {
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Maharashtra": ["Nagpur", "Mumbai", "Pune", "Nashik", "Aurangabad"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    "Haryana": ["Karnal", "Ambala", "Gurugram", "Hisar", "Rohtak"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"]
  };

  // 3. Updated Fetch Logic with advance filters
  const fetchTools = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.state) queryParams.append("state", filters.state);
      if (filters.district) queryParams.append("district", filters.district);
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.minRent) queryParams.append("minRent", filters.minRent);
      if (filters.maxRent) queryParams.append("maxRent", filters.maxRent);

      const res = await fetch(`https://kissanapp.onrender.com/api/machinery?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) setTools(data.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setTools([]);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return (
    <div className="warehouse-page">
      <div className="warehouse-hero">
        <h1>Agri Machinery & Tools</h1>
        <p>Rent tractors, tools and modern machinery nearby</p>
      </div>

      <div className="main-content">
        {/*  ADVANCE FILTER CARD */}
        <div className="filter-card">
          <h4>Filter Machinery</h4>
          
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
                list="tool-city-list"
                placeholder="Type or Select City"
                value={filters.district}
                disabled={!filters.state}
                onChange={(e) => setFilters({...filters, district: e.target.value})}
              />
              <datalist id="tool-city-list">
                {filters.state && locationData[filters.state].map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div className="input-group">
              <label>Category</label>
              <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
                <option value="">All Categories</option>
                <option value="Tractor">Tractor</option>
                <option value="Harvester">Harvester</option>
                <option value="Ploughs">Ploughs</option>
                <option value="Tools">Small Tools</option>
              </select>
            </div>
          </div>

          <div className="filter-row second-row">
            <div className="input-group capacity">
              <label>Rent Price Range (₹/Day)</label>
              <div className="range-wrap">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={filters.minRent}
                  onChange={(e) => setFilters({...filters, minRent: e.target.value})}
                />
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={filters.maxRent}
                  onChange={(e) => setFilters({...filters, maxRent: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="filter-buttons">
            <button className="btn-apply" onClick={fetchTools}>Apply Filter</button>
            <button className="btn-reset" onClick={() => {
              setFilters({state: "", district: "", category: "", minRent: "", maxRent: ""});
              window.location.reload(); // Simple refresh for reset
            }}>Reset Filters</button>
          </div>
        </div>

        <h3 className="list-title">Available Machinery</h3>
        
        <div className="warehouse-grid">
          {tools.length > 0 ? (
            tools.map((t) => (
              <div className="w-card" key={t._id}>
                <span className="w-tag">{t.category}</span>
                <img 
                  src={t.imageUrl || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1000"} 
                  alt={t.toolName} 
                />
                <div className="w-info">
                  <h4>{t.toolName}</h4>
                  <p className="w-loc">📍 {t.location}</p>
                  <div className="w-details">
                    <p>Rent: <strong>₹{t.rentPrice}/day</strong></p>
                    <p>Condition: <strong>{t.condition}</strong></p>
                    <p>Owner: {t.ownerName}</p>
                  </div>
                  <div className="w-btns">
                    <button className="btn-v" onClick={() => setSelectedTool(t)}>View Details</button>
                    <a href={`tel:${t.ownerPhone}`} className="btn-r" style={{textDecoration:'none', textAlign:'center'}}>📞 Call Owner</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-box">
              <h4>No machinery found for selected filters</h4>
            </div>
          )}
        </div>

        
        {selectedTool && (
          <div className="modal-overlay" onClick={() => setSelectedTool(null)}>
            <div className="modal-square" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={() => setSelectedTool(null)}>&times;</button>
              
              <div className="modal-inner-grid">
                <div className="modal-image-container">
                  <img src={selectedTool.imageUrl || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1000"} alt="Tool" />
                </div>
                <div className="modal-details-container">
                  <h2>{selectedTool.toolName}</h2>
                  <p className="modal-location">📍 {selectedTool.location}</p>
                  
                  <div className="modal-stats-grid">
                    <div className="stat-item"><strong>Category:</strong> {selectedTool.category}</div>
                    <div className="stat-item"><strong>Rent:</strong> ₹{selectedTool.rentPrice}/day</div>
                    <div className="stat-item"><strong>Condition:</strong> {selectedTool.condition}</div>
                  </div>

                  <div className="owner-box">
                    <h4>👤 Owner Details</h4>
                    <p><strong>Name:</strong> {selectedTool.ownerName}</p>
                    <a href={`tel:${selectedTool.ownerPhone}`} className="modal-call-link">
                        📞 Call {selectedTool.ownerPhone}
                    </a>
                  </div>

                  {selectedTool.description && (
                    <div className="about-box">
                      <strong>Description:</strong>
                      <p>{selectedTool.description}</p>
                    </div>
                  )}

                  <div className="modal-action-footer">
                    <button className="btn-r full-width" onClick={() => window.location.href = `tel:${selectedTool.ownerPhone}`}>
                      Confirm Rental (Call Now)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="add-btn-container">
          <button className="floating-add-btn" onClick={() => navigate("/add-machinery")}>
            ➕ List Your Tool
          </button>
        </div>
      </div>
    </div>
  );
}

export default Machinery;
