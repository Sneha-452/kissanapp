import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Warehouse.css"; 

function Directsell() {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null); 

  const [filters, setFilters] = useState({
    state: "",
    district: "",
    cropType: "",
    minPrice: "",
    maxPrice: ""
  });

  const locationData = {
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Maharashtra": ["Nagpur", "Mumbai", "Pune", "Nashik", "Aurangabad"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    "Haryana": ["Karnal", "Ambala", "Gurugram", "Hisar", "Rohtak"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"]
  };

  const applyFilters = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.state) queryParams.append("state", filters.state);
      if (filters.district) queryParams.append("district", filters.district);
      if (filters.cropType) queryParams.append("cropType", filters.cropType);
      if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
      if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);

      const res = await fetch(`https://kissanapp.onrender.com/api/crops?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) setCrops(data.data);
    } catch (err) {
      console.error("Filter error:", err);
      setCrops([]);
    }
  };

  useEffect(() => {
    applyFilters();
  }, []);

  return (
    <div className="warehouse-page">
      <div className="warehouse-hero">
        <h1>Direct Crop Selling</h1>
        <p>Fresh crops directly from the farmers' fields to your home</p>
      </div>

      <div className="main-content">
        <div className="filter-card">
          <h4>Filter Crops</h4>
          <div className="filter-row">
            <div className="input-group">
              <label>State</label>
              <select value={filters.state} onChange={(e) => setFilters({...filters, state: e.target.value, district: ""})}>
                <option value="">Select State</option>
                {Object.keys(locationData).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>District</label>
              <input list="city-list" placeholder="Select City" value={filters.district} disabled={!filters.state} onChange={(e) => setFilters({...filters, district: e.target.value})} />
              <datalist id="city-list">
                {filters.state && locationData[filters.state].map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>

          <div className="filter-row second-row">
            <div className="input-group crops">
              <label>Select Crop</label>
              <div className="checkbox-wrap">
                {["Wheat", "Rice", "Potato", "Tomato", "Maize", "Pulses"].map(c => (
                  <label key={c}><input type="checkbox" checked={filters.cropType === c} onChange={() => setFilters({...filters, cropType: c})} /> {c}</label>
                ))}
              </div>
            </div>
            <div className="input-group capacity">
              <label>Price Range (₹/kg)</label>
              <div className="range-wrap">
                <input type="number" placeholder="Min" value={filters.minPrice} onChange={(e) => setFilters({...filters, minPrice: e.target.value})} />
                <input type="number" placeholder="Max" value={filters.maxPrice} onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="filter-buttons">
            <button className="btn-apply" onClick={applyFilters}>Apply Filter</button>
            <button className="btn-reset" onClick={() => {
              setFilters({state: "", district: "", cropType: "", minPrice: "", maxPrice: ""});
              applyFilters();
            }}>Reset Filters</button>
          </div>
        </div>

        <h3 className="list-title">Available Listings</h3>
        <div className="warehouse-grid">
          {crops.length > 0 ? (
            crops.map((c) => (
              <div className="w-card" key={c._id}>
                <span className="w-tag">{c.qualityGrade || "A Grade"}</span>
                <img src={c.imageUrl || "https://images.unsplash.com/photo-1595244712601-3965d29b04f1?q=80&w=1000"} alt={c.cropName} />
                <div className="w-info">
                  <h4>{c.cropName}</h4>
                  <p className="w-loc">📍 {c.location}</p>
                  <div className="w-details">
                    <p>Quantity: <strong>{c.quantity} kg</strong></p>
                    <p>Price: <strong>₹{c.price}/kg</strong></p>
                    <p>Farmer: {c.farmerName}</p>
                  </div>
                  <div className="w-btns">
                  
                    <button className="btn-v" onClick={() => setSelectedCrop(c)}>View Details</button>
                    <a href={`tel:${c.farmerPhone}`} className="btn-r" style={{textDecoration:'none', textAlign:'center'}}>📞 Call Farmer</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="empty-box">
                <h4>No crops found matching your search.</h4>
             </div>
          )}
        </div>

   
        {selectedCrop && (
          <div className="modal-overlay" onClick={() => setSelectedCrop(null)}>
            <div className="modal-square" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={() => setSelectedCrop(null)}>&times;</button>
              
              <div className="modal-inner-grid">
             
                <div className="modal-image-container">
                  <img src={selectedCrop.imageUrl || "https://images.unsplash.com/photo-1595244712601-3965d29b04f1?q=80&w=1000"} alt="Crop" />
                </div>

               
                <div className="modal-details-container">
                  <h2>{selectedCrop.cropName} Listing</h2>
                  <p className="modal-location">📍 {selectedCrop.location}</p>
                  
                  <div className="modal-stats-grid">
                    <div className="stat-item"><strong>Quality:</strong> {selectedCrop.qualityGrade}</div>
                    <div className="stat-item"><strong>Price:</strong> ₹{selectedCrop.price}/kg</div>
                    <div className="stat-item"><strong>Quantity:</strong> {selectedCrop.quantity} kg</div>
                  </div>

                  <div className="owner-box">
                    <h4>👤 Farmer Details</h4>
                    <p><strong>Farmer Name:</strong> {selectedCrop.farmerName}</p>
                    <a href={`tel:${selectedCrop.farmerPhone}`} className="modal-call-link">
                        📞 Call {selectedCrop.farmerPhone}
                    </a>
                  </div>

                  <div className="modal-action-footer">
                    <button className="btn-r full-width" onClick={() => window.location.href = `tel:${selectedCrop.farmerPhone}`}>
                      Confirm & Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="add-btn-container">
          <button className="floating-add-btn" onClick={() => navigate("/add-crop-listing")}>➕ Sell Your Crop</button>
        </div>
      </div>
    </div>
  );
}

export default Directsell;
