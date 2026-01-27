import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Warehouse.css";

function Warehouse() {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  // 1. Filter State Setup
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    pincode: "",
    cropType: "",
    minCap: "",
    maxCap: ""
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
  const applyFilters = async () => {
    try {
      // URL query string banana (e.g. ?state=Punjab&minCap=100)
      const queryParams = new URLSearchParams();
      if (filters.state) queryParams.append("state", filters.state);
      if (filters.district) queryParams.append("district", filters.district);
      if (filters.pincode) queryParams.append("pincode", filters.pincode);
      if (filters.cropType) queryParams.append("cropType", filters.cropType);
      if (filters.minCap) queryParams.append("minCap", filters.minCap);
      if (filters.maxCap) queryParams.append("maxCap", filters.maxCap);

      const res = await fetch(`http://localhost:5000/api/warehouses?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setWarehouses(data.data);
      }
    } catch (err) {
      console.error("Filter error:", err);
      setWarehouses([]);
    }
  };

  // Initial Load
  useEffect(() => {
    applyFilters();
  }, []);

  // Request Storage Handler
  const handleRequestStorage = async (warehouse) => {
    const farmerName = prompt("Apna Naam likhein:");
    const farmerPhone = prompt("Apna Mobile Number likhein:");
    const quantity = prompt("Kitna Quintal store karna hai?");

    if (!farmerName || !farmerPhone || !quantity) {
      alert("Saari details bharna zaroori hai!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/warehouses/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          warehouseId: warehouse._id,
          farmerName,
          farmerPhone,
          quantity
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Success! Request sent to ${warehouse.name}. Owner will contact you.`);
      }
    } catch (err) {
      alert("Request fail ho gayi.");
    }
  };

  return (
    <div className="warehouse-page">
      <div className="warehouse-hero">
        <h1>Find Nearest Warehouse</h1>
        <p>Search warehouses based on location & capacity</p>
      </div>

      <div className="main-content">
        {/* 🔍 FILTER BOX - FIXED DROPDOWNS */}
        <div className="filter-card">
          <h4>Filter Warehouses</h4>
          
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
              {/* Searchable input using datalist */}
              <input 
                list="city-list"
                placeholder="Type or Select City"
                value={filters.district}
                disabled={!filters.state}
                onChange={(e) => setFilters({...filters, district: e.target.value})}
              />
              <datalist id="city-list">
                {filters.state && locationData[filters.state].map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div className="input-group">
              <label>Pincode</label>
              <input 
                type="text" 
                placeholder="Enter Pincode" 
                value={filters.pincode}
                onChange={(e) => setFilters({...filters, pincode: e.target.value})}
              />
            </div>
          </div>

          <div className="filter-row second-row">
            <div className="input-group crops">
              <label>Crop Type</label>
              <div className="checkbox-wrap">
                <label><input type="checkbox" checked={filters.cropType === "Wheat"} onChange={() => setFilters({...filters, cropType: "Wheat"})} /> Wheat</label>
                <label><input type="checkbox" checked={filters.cropType === "Rice"} onChange={() => setFilters({...filters, cropType: "Rice"})} /> Rice</label>
                <label><input type="checkbox" checked={filters.cropType === "Potato"} onChange={() => setFilters({...filters, cropType: "Potato"})} /> Potato</label>
                <label><input type="checkbox" checked={filters.cropType === "Vegetables"} onChange={() => setFilters({...filters, cropType: "Vegetables"})} /> Vegetables</label>
    <label><input type="checkbox" checked={filters.cropType === "Maize"} onChange={() => setFilters({...filters, cropType: "Maize"})} /> Maize</label>
    <label><input type="checkbox" checked={filters.cropType === "Pulses"} onChange={() => setFilters({...filters, cropType: "Pulses"})} /> Pulses</label>
    <label><input type="checkbox" checked={filters.cropType === "Fruits"} onChange={() => setFilters({...filters, cropType: "Fruits"})} /> Fruits</label>
    <label><input type="checkbox" checked={filters.cropType === "Spices"} onChange={() => setFilters({...filters, cropType: "Spices"})} /> Spices</label>
              </div>
            </div>
            <div className="input-group capacity">
              <label>Capacity Available (Quintal)</label>
              <div className="range-wrap">
                <input 
                  type="number" 
                  placeholder="Min Qtl" 
                  value={filters.minCap}
                  onChange={(e) => setFilters({...filters, minCap: e.target.value})}
                />
                <input 
                  type="number" 
                  placeholder="Max Qtl" 
                  value={filters.maxCap}
                  onChange={(e) => setFilters({...filters, maxCap: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="filter-buttons">
            <button className="btn-apply" onClick={applyFilters}>Apply Filter</button>
            <button className="btn-reset" onClick={() => {
              const reset = {state: "", district: "", pincode: "", cropType: "", minCap: "", maxCap: ""};
              setFilters(reset);
              // Fetch all again after reset
              fetch("http://localhost:5000/api/warehouses")
                .then(res => res.json())
                .then(data => setWarehouses(data.data));
            }}>Reset Filters</button>
          </div>
        </div>

        <h3 className="list-title">Available Warehouses</h3>
        
        <div className="warehouse-grid">
          {warehouses.length > 0 ? (
            warehouses.map((w) => (
              <div className="w-card" key={w._id}>
                <span className="w-tag">{w.type || "General"}</span>
                <img 
                  src={w.imageUrl || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000"} 
                  alt={w.name} 
                />
                <div className="w-info">
                  <h4>{w.name}</h4>
                  <p className="w-loc">📍 {w.district}, {w.state}</p>
                  <div className="w-details">
                    <p>Total Capacity: {w.totalCapacity} Quintal</p>
                    <p>Available Space: <strong>{w.availableSpace} Quintal</strong></p>
                    <p>Crops: {w.cropTypes?.join(", ")}</p>
                  </div>
                  <div className="w-btns">
                    <button className="btn-v" onClick={() => setSelectedWarehouse(w)}>View Details</button>
                    <button className="btn-r" onClick={() => handleRequestStorage(w)}>Request Storage</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-box">
              <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="Empty" />
              <h4>No warehouse available in the selected location</h4>
              <p>Try adjusting your filters or search nearby areas.</p>
            </div>
          )}
        </div>

        {/* DETAILS MODAL */}
        {selectedWarehouse && (
          <div className="modal-overlay" onClick={() => setSelectedWarehouse(null)}>
            <div className="modal-square" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={() => setSelectedWarehouse(null)}>&times;</button>
              <div className="modal-inner-grid">
                <div className="modal-image-container">
                  <img src={selectedWarehouse.imageUrl || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000"} alt="Warehouse" />
                </div>
                <div className="modal-details-container">
                  <h2>{selectedWarehouse.name}</h2>
                  <p className="modal-location">📍 {selectedWarehouse.district}, {selectedWarehouse.state} - {selectedWarehouse.pincode}</p>
                  <div className="modal-stats-grid">
                    <div className="stat-item"><strong>Type:</strong> {selectedWarehouse.type}</div>
                    <div className="stat-item"><strong>Charges:</strong> {selectedWarehouse.charges || "N/A"}</div>
                    <div className="stat-item"><strong>Capacity:</strong> {selectedWarehouse.totalCapacity} Qtl</div>
                    <div className="stat-item"><strong>Available:</strong> {selectedWarehouse.availableSpace} Qtl</div>
                  </div>
                  <div className="modal-crops-section">
                    <strong>Suitable for:</strong>
                    <div className="crop-tags-wrap">
                      {selectedWarehouse.cropTypes?.map((crop, idx) => (
                        <span key={idx} className="crop-tag">{crop}</span>
                      ))}
                    </div>
                  </div>
                  <div className="owner-box">
                    <h4>👤 Owner Details</h4>
                    <p><strong>Name:</strong> {selectedWarehouse.ownerName}</p>
                    <a href={`tel:${selectedWarehouse.ownerPhone}`} className="modal-call-link">📞 Call {selectedWarehouse.ownerPhone}</a>
                  </div>
                  <div className="modal-action-footer">
                    <button className="btn-r full-width" onClick={() => handleRequestStorage(selectedWarehouse)}>Confirm Request Storage</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="add-btn-container">
          <button className="floating-add-btn" onClick={() => navigate("/add-warehouse")}>➕ List Your Warehouse</button>
        </div>
      </div>
    </div>
  );
}

export default Warehouse;