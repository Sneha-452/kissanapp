import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Warehouse.css"; 

function Transportation() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);


  const [filters, setFilters] = useState({
    state: "",
    district: "",
    vehicleType: "",
    minCap: "",
    maxCap: ""
  });

  
  const locationData = {
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Maharashtra": ["Nagpur", "Mumbai", "Pune", "Nashik", "Aurangabad"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    "Haryana": ["Karnal", "Ambala", "Gurugram", "Hisar", "Rohtak"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"]
  };

 
  const fetchTransport = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.state) queryParams.append("state", filters.state);
      if (filters.district) queryParams.append("district", filters.district);
      if (filters.vehicleType) queryParams.append("vehicleType", filters.vehicleType);
      if (filters.minCap) queryParams.append("minCap", filters.minCap);
      if (filters.maxCap) queryParams.append("maxCap", filters.maxCap);

      const res = await fetch(`http://localhost:5000/api/transportation?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) setList(data.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setList([]);
    }
  };

  useEffect(() => {
    fetchTransport();
  }, []);

  return (
    <div className="warehouse-page">
      <div className="warehouse-hero">
        <h1>Agri Transportation</h1>
        <p>Book reliable transport for your crops and farming supplies</p>
      </div>

      <div className="main-content">
      
        <div className="filter-card">
          <h4>Filter Transport</h4>
          
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
                list="trans-city-list"
                placeholder="Type or Select City"
                value={filters.district}
                disabled={!filters.state}
                onChange={(e) => setFilters({...filters, district: e.target.value})}
              />
              <datalist id="trans-city-list">
                {filters.state && locationData[filters.state].map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div className="input-group">
              <label>Vehicle Type</label>
              <select value={filters.vehicleType} onChange={(e) => setFilters({...filters, vehicleType: e.target.value})}>
                <option value="">All Vehicles</option>
                <option value="Mini Truck (Chota Hathi)">Mini Truck</option>
                <option value="Pickup Truck">Pickup Truck</option>
                <option value="Tractor-Trolley">Tractor-Trolley</option>
                <option value="Bada Truck">Bada Truck</option>
              </select>
            </div>
          </div>

          <div className="filter-row second-row">
            <div className="input-group capacity">
              <label>Capacity Range (Quintals)</label>
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
            <button className="btn-apply" onClick={fetchTransport}>Apply Filter</button>
            <button className="btn-reset" onClick={() => {
              setFilters({state: "", district: "", vehicleType: "", minCap: "", maxCap: ""});
              window.location.reload(); 
            }}>Reset Filters</button>
          </div>
        </div>

        <h3 className="list-title">Available Transport Services</h3>
        
        <div className="warehouse-grid">
          {list.length > 0 ? (
            list.map((t) => (
              <div className="w-card" key={t._id}>
                <span className="w-tag">{t.vehicleType}</span>
                <img 
                  src={t.imageUrl || "https://images.unsplash.com/photo-1519003722824-192d992a7de2?q=80&w=1000"} 
                  alt={t.vehicleName} 
                />
                <div className="w-info">
                  <h4>{t.vehicleName}</h4>
                  <p className="w-loc">📍 {t.location}, {t.district}</p>
                  <div className="w-details">
                    <p>Capacity: <strong>{t.capacity} Qtl</strong></p>
                    <p>Rate: <strong>₹{t.pricePerKm}/km</strong></p>
                    <p>Driver: {t.driverName}</p>
                  </div>
                  <div className="w-btns">
                    <button className="btn-v" onClick={() => setSelected(t)}>Details</button>
                    <a href={`tel:${t.driverPhone}`} className="btn-r" style={{textDecoration:'none', textAlign:'center'}}>📞 Call Driver</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-box">
              <h4>No transport services found matching your filters.</h4>
            </div>
          )}
        </div>

     
        {selected && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal-square" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={() => setSelected(null)}>&times;</button>
              <div className="modal-inner-grid">
                <div className="modal-image-container">
                  <img src={selected.imageUrl || "https://images.unsplash.com/photo-1519003722824-192d992a7de2?q=80&w=1000"} alt="Vehicle" />
                </div>
                <div className="modal-details-container">
                  <h2>{selected.vehicleName}</h2>
                  <p className="modal-location">📍 {selected.location}, {selected.district}, {selected.state}</p>
                  
                  <div className="modal-stats-grid">
                    <div className="stat-item"><strong>Type:</strong> {selected.vehicleType}</div>
                    <div className="stat-item"><strong>Capacity:</strong> {selected.capacity} Qtl</div>
                    <div className="stat-item"><strong>Rate:</strong> ₹{selected.pricePerKm}/km</div>
                  </div>

                  <div className="owner-box">
                    <h4>👤 Driver Details</h4>
                    <p><strong>Name:</strong> {selected.driverName}</p>
                    <a href={`tel:${selected.driverPhone}`} className="modal-call-link">
                        📞 Call Driver
                    </a>
                  </div>

                  <div className="modal-action-footer">
                    <button className="btn-r full-width" onClick={() => window.location.href = `tel:${selected.driverPhone}`}>
                      Confirm Booking (Call Now)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="add-btn-container">
          <button className="floating-add-btn" onClick={() => navigate("/add-transportation")}>
            ➕ Add Your Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transportation;
