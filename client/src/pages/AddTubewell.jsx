import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/AddWarehouse.css"; 

function AddTubewell() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    ownerName: "", locationName: "", hourlyRate: "",
    hp: "", fuelType: "Electric", pipeAvailable: false,
    contactNumber: "", lat: "", lng: ""
  });

  // 📍 Current Location automatically fetch karna
  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setForm({ ...form, lat: pos.coords.latitude, lng: pos.coords.longitude });
        alert("Location Fixed! Latitude: " + pos.coords.latitude);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Backend API Call yahan aayegi
    console.log("Submitting Tubewell Data:", form);
    setTimeout(() => {
      alert("Tubewell Listed Successfully!");
      navigate("/watermanagement");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="add-w-page">
      <div className="add-w-container">
        <div className="add-w-header">
          <h2>⛲ List Your Tubewell</h2>
          <p>Apne tubewell ki jankari bharein taaki log aapse pani le sakein.</p>
        </div>

        <form className="add-w-form" onSubmit={handleSubmit}>
          {/* OWNER & LOCATION */}
          <div className="form-section">
            <h4>👤 Owner & Place</h4>
            <input name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
            <input name="locationName" placeholder="Village / Area Name" onChange={handleChange} required />
            
            <button type="button" onClick={getMyLocation} style={{ background: "#0369a1", color: "white", padding: "10px", borderRadius: "8px", border: "none", cursor: "pointer", marginTop: "10px", width: "100%" }}>
              📍 Get My Current Location (GPS)
            </button>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>*Tubewell ke paas khade hokar button dabayein.</p>
          </div>

          {/* TECHNICAL DETAILS */}
          <div className="form-section">
            <h4>⚙️ Tubewell Details</h4>
            <div className="flex-row">
              <input name="hp" placeholder="Horsepower (e.g. 15HP)" onChange={handleChange} />
              <select name="fuelType" onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}>
                <option value="Electric">Electric (Bijli)</option>
                <option value="Diesel">Diesel (Engine)</option>
                <option value="Solar">Solar</option>
              </select>
            </div>
            
            <div className="flex-row" style={{ marginTop: "15px" }}>
              <input type="number" name="hourlyRate" placeholder="Rate Per Hour (₹)" onChange={handleChange} required />
              <input type="tel" name="contactNumber" placeholder="Contact Number" onChange={handleChange} required />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "15px", background: "#f0f9ff", padding: "10px", borderRadius: "8px" }}>
              <input type="checkbox" name="pipeAvailable" onChange={handleChange} style={{ width: "20px", height: "20px" }} />
              <label style={{ fontWeight: "bold", color: "#0369a1" }}>Kya aapke paas delivery pipe available hai?</label>
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading} style={{ background: "#0369a1" }}>
            {loading ? "Listing..." : "List Tubewell Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTubewell;