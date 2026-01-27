

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Warehouse.css"; 

function Seeds() {
  const navigate = useNavigate();
  const [seeds, setSeeds] = useState([]);
  const [selectedSeed, setSelectedSeed] = useState(null);

  // 1. Filter State Setup
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  });

  // 2. Searchable Location Data
  const locationData = {
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Maharashtra": ["Nagpur", "Mumbai", "Pune", "Nashik", "Aurangabad"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    "Haryana": ["Karnal", "Ambala", "Gurugram", "Hisar", "Rohtak"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"]
  };

  // 3. Apply Filter Logic (Backend Connection)
  const fetchSeeds = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.state) queryParams.append("state", filters.state);
      if (filters.district) queryParams.append("district", filters.district);
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
      if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);

      const res = await fetch(`http://localhost:5000/api/seeds?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) setSeeds(data.data);
    } catch (err) {
      console.error("Filter error:", err);
      setSeeds([]);
    }
  };

  useEffect(() => {
    fetchSeeds();
  }, []);

  return (
    <div className="warehouse-page">
      <div className="warehouse-hero">
        <h1>Quality Seeds Marketplace</h1>
        <p>Search seeds based on variety, location & price</p>
      </div>

      <div className="main-content">
     
        <div className="filter-card">
          <h4>Filter Seeds</h4>
          
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
                list="seed-city-list"
                placeholder="Type or Select City"
                value={filters.district}
                disabled={!filters.state}
                onChange={(e) => setFilters({...filters, district: e.target.value})}
              />
              <datalist id="seed-city-list">
                {filters.state && locationData[filters.state].map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div className="input-group">
              <label>Seed Category</label>
              <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
                <option value="">All Categories</option>
                <option value="Grains">Grains</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Pulses">Pulses</option>
              </select>
            </div>
          </div>

          <div className="filter-row second-row">
            <div className="input-group capacity">
              <label>Price Range (₹ per kg/pkt)</label>
              <div className="range-wrap">
                <input 
                  type="number" 
                  placeholder="Min Price" 
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
                <input 
                  type="number" 
                  placeholder="Max Price" 
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="filter-buttons">
            <button className="btn-apply" onClick={fetchSeeds}>Apply Filter</button>
            <button className="btn-reset" onClick={() => {
              setFilters({state: "", district: "", category: "", minPrice: "", maxPrice: ""});
              window.location.reload(); 
            }}>Reset Filters</button>
          </div>
        </div>

        <h3 className="list-title">Available Seed Listings</h3>
        
        <div className="warehouse-grid">
          {seeds.length > 0 ? (
            seeds.map((s) => (
              <div className="w-card" key={s._id}>
                <span className="w-tag">{s.category}</span>
                <img 
                  src={s.imageUrl || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000"} 
                  alt={s.seedName} 
                />
                <div className="w-info">
                  <h4>{s.seedName}</h4>
                  <p className="w-loc">📍 {s.location}</p>
                  <div className="w-details">
                    <p>Variety: <strong>{s.variety}</strong></p>
                    <p>Price: <strong>₹{s.price}/kg</strong></p>
                    <p>Available: {s.quantityAvailable} kg</p>
                  </div>
                  <div className="w-btns">
                    <button className="btn-v" onClick={() => setSelectedSeed(s)}>View Details</button>
                    <a href={`tel:${s.sellerPhone}`} className="btn-r" style={{textDecoration:'none', textAlign:'center'}}>📞 Call Seller</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-box">
              <h4>No seeds found for the selected location or category.</h4>
            </div>
          )}
        </div>

        {/* DETAILS MODAL */}
        {selectedSeed && (
          <div className="modal-overlay" onClick={() => setSelectedSeed(null)}>
            <div className="modal-square" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={() => setSelectedSeed(null)}>&times;</button>
              <div className="modal-inner-grid">
                <div className="modal-image-container">
                  <img src={selectedSeed.imageUrl || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000"} alt="Seed" />
                </div>
                <div className="modal-details-container">
                  <h2>{selectedSeed.seedName}</h2>
                  <p className="modal-location">📍 {selectedSeed.location}</p>
                  <div className="modal-stats-grid">
                    <div className="stat-item"><strong>Category:</strong> {selectedSeed.category}</div>
                    <div className="stat-item"><strong>Variety:</strong> {selectedSeed.variety}</div>
                    <div className="stat-item"><strong>Price:</strong> ₹{selectedSeed.price}/kg</div>
                    <div className="stat-item"><strong>In Stock:</strong> {selectedSeed.quantityAvailable} kg</div>
                  </div>
                  <div className="owner-box">
                    <h4>👤 Seller Details</h4>
                    <p><strong>Name:</strong> {selectedSeed.sellerName}</p>
                    <a href={`tel:${selectedSeed.sellerPhone}`} className="modal-call-link">📞 Call {selectedSeed.sellerPhone}</a>
                  </div>
                  <div className="modal-action-footer">
                    <button className="btn-r full-width" onClick={() => window.location.href = `tel:${selectedSeed.sellerPhone}`}>Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="add-btn-container">
          <button className="floating-add-btn" onClick={() => navigate("/add-seeds")}>➕ List Your Seeds</button>
        </div>
      </div>
    </div>
  );
}

export default Seeds;