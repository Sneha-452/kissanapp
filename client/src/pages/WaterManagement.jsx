import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Warehouse.css"; 

function WaterManagement() {
  const [tubewells, setTubewells] = useState([]);
  const [range, setRange] = useState(10); 
  const [villageSearch, setVillageSearch] = useState("");
  const [fuelFilter, setFuelFilter] = useState("All");
  const [userLoc, setUserLoc] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📍 Fetch Current Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {
        console.log("Location access denied or not available.");
        setLoading(false);
      }
    );
  }, []);

  // 🔄 Fetch Data based on Filters
useEffect(() => {
  const fetchTubewells = async () => {
    setLoading(true);
    try {
      // Test ke liye: Direct all data fetch
      const res = await fetch(`http://localhost:5000/api/water/nearby?range=5000`); // 5000km range for testing
      const result = await res.json();
      
      console.log("Total Tubewells received from DB:", result.data ? result.data.length : 0);
      console.log("Full Data:", result.data);

      if (result.success) {
        setTubewells(result.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchTubewells();
}, []);

  // ⛽ Frontend Fuel Filter
  const finalData = fuelFilter === "All" 
    ? tubewells 
    : tubewells.filter(tw => tw.fuelType === fuelFilter);

  return (
    <div className="warehouse-page">
      {/* --- HERO SECTION --- */}
      <div className="warehouse-hero" style={{ background: "linear-gradient(135deg, #075985 0%, #0369a1 100%)" }}>
        <h1>Water Management System</h1>
        <p>Find nearby tubewells by GPS or search by Village name.</p>
        
        <div style={{ marginTop: "20px", width: "100%", maxWidth: "600px", display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="🔍 Search by Village Name (e.g., Rampur)..." 
              className="w-search-input"
              style={{ width: "100%", padding: "15px", borderRadius: "8px", border: "none" }}
              onChange={(e) => setVillageSearch(e.target.value)}
            />
            <div style={{ background: "rgba(255,255,255,0.1)", padding: "10px", borderRadius: "8px" }}>
                <label style={{ color: "white" }}>Search Radius: <strong>{range} km</strong></label>
                <input type="range" min="1" max="100" value={range} onChange={(e) => setRange(e.target.value)} style={{ width: "100%" }} />
            </div>
        </div>
      </div>

      <div className="main-content">
        {/* --- FILTERS & ADD BUTTON --- */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "10px" }}>
          <select 
            onChange={(e) => setFuelFilter(e.target.value)}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
          >
            <option value="All">All Fuel Types</option>
            <option value="Electric">Electric</option>
            <option value="Diesel">Diesel</option>
            <option value="Solar">Solar</option>
          </select>

          <Link to="/add-tubewell">
            <button className="btn-submit" style={{ width: "auto", margin: 0, background: "#0369a1" }}>
              + List My Tubewell
            </button>
          </Link>
        </div>

        {/* --- TUBEWELL GRID --- */}
        {loading ? (
          <p style={{ textAlign: "center" }}>Scanning for tubewells...</p>
        ) : (
          <div className="warehouse-grid">
            {finalData.length > 0 ? (
              finalData.map((well) => (
                <div className="w-card" key={well._id}>
                  <div className="w-tag" style={{ background: well.isAvailable ? "#dcfce7" : "#fee2e2", color: well.isAvailable ? "#166534" : "#991b1b" }}>
                    {well.isAvailable ? "● AVAILABLE" : "○ BUSY"}
                  </div>
                  <div style={{ padding: "20px" }}>
                    <div style={{ fontSize: "40px", textAlign: "center" }}>⛲</div>
                    <h3 style={{ textAlign: "center", marginBottom: "5px" }}>{well.ownerName}</h3>
                    <p style={{ color: "#0369a1", fontWeight: "bold", textAlign: "center" }}>📍 {well.locationName.toUpperCase()}</p>
                    <hr style={{ margin: "15px 0", opacity: 0.2 }} />
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.85rem" }}>
                      <div>💰 ₹{well.hourlyRate}/hr</div>
                      <div>⚡ {well.hp} HP</div>
                      <div>⛽ {well.fuelType}</div>
                      <div>🚜 Pipe: {well.pipeAvailable ? "Yes" : "No"}</div>
                    </div>

                    <div className="w-btns" style={{ marginTop: "20px" }}>
                      <a href={`tel:${well.contactNumber}`} className="btn-r" style={{ background: "#0369a1", textDecoration: 'none', textAlign: 'center', flex: 1 }}>
                        📞 Call Owner
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>
                <p>No tubewells found in this range. Try increasing the search radius.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WaterManagement;