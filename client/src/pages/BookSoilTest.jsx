import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddWarehouse.css"; 

function BookSoilTest() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    farmerName: "",
    farmerPhone: "",
    state: "",
    district: "",
    village: "",
    testType: "Basic",
    preferredDate: "",
    landArea: "",
    mainCrop: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const res = await fetch("http://localhost:5000/api/soil-test/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    
    const result = await res.json();
    if (result.success) {
      alert("Booking Confirmed! Hamara expert aapse jald hi sampark karega.");
      navigate("/soildetection");
    } else {
      alert("Kuch galat hua. Kripya dobara koshish karein.");
    }
  } catch (err) {
    console.error("Booking error:", err);
    alert("Server connect nahi ho pa raha.");
  }
};

  return (
    <div className="add-w-page">
      <div className="add-w-container">
        <div className="add-w-header">
          <h2>📅 Book Your Soil Test</h2>
          <p>Fill in the details below and we will collect the sample from your farm.</p>
        </div>

        <form className="add-w-form" onSubmit={handleSubmit}>
          {/* Section 1: Personal Details */}
          <div className="form-section">
            <h4>👤 Contact Information</h4>
            <div className="flex-row">
              <input type="text" name="farmerName" placeholder="Farmer Name" onChange={handleChange} required />
              <input type="tel" name="farmerPhone" placeholder="Mobile Number" onChange={handleChange} required />
            </div>
          </div>

          {/* Section 2: Farm Location */}
          <div className="form-section">
            <h4>📍 Farm Location</h4>
            <div className="flex-row">
              <input type="text" name="state" placeholder="State" onChange={handleChange} required />
              <input type="text" name="district" placeholder="District" onChange={handleChange} required />
            </div>
            <input type="text" name="village" placeholder="Village / Landmark" onChange={handleChange} required />
          </div>

          {/* Section 3: Testing Requirements */}
          <div className="form-section">
            <h4>🧪 Testing Details</h4>
            <div className="flex-row">
              <select name="testType" onChange={handleChange} required>
                <option value="Basic">Basic Soil Test (NPK + pH)</option>
                <option value="Advanced">Advanced (Basic + Micronutrients)</option>
                <option value="Fruit-Specific">Fruit & Horticulture Special</option>
              </select>
              <input type="date" name="preferredDate" placeholder="Preferred Collection Date" onChange={handleChange} required />
            </div>
            <div className="flex-row">
              <input type="number" name="landArea" placeholder="Land Area (Acre)" onChange={handleChange} />
              <input type="text" name="mainCrop" placeholder="Main Crop (e.g. Wheat, Paddy)" onChange={handleChange} required />
            </div>
            <textarea name="message" placeholder="Any special instruction for the soil expert?" onChange={handleChange}></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/soildetection")}>Back</button>
            <button type="submit" className="btn-submit">Confirm Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookSoilTest;