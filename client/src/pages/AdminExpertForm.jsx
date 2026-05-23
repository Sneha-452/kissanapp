import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/AddWarehouse.css"; 

function AdminExpertForm() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    name: "", specialization: "", experience: "",
    education: "", fees: "", phone: "",
    isOnline: true,
    slots: "10:00 AM, 12:00 PM, 02:00 PM, 04:00 PM" // Default slots string
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };
  
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    if (file) formData.append("image", file);
    
    // Slots ko array mein convert karke bhejenge
    const expertData = {
        ...form,
        slots: form.slots.split(",").map(s => s.trim())
    };

    Object.keys(expertData).forEach(key => formData.append(key, expertData[key]));

    try {
      const res = await fetch("https://kissanapp.onrender.com/api/experts/add", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        alert("Expert Added Successfully with Slots!");
        navigate("/personaladvisory");
      }
    } catch (err) {
      console.error("Upload Error:", err);
    }
  };

  return (
    <div className="add-w-page">
      <div className="add-w-container">
        <div className="add-w-header">
          <h2>🛡️ Admin: Expert Management</h2>
          <p>Naye expert ki details aur unke availability slots yahan bharein.</p>
        </div>
        <form className="add-w-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h4>👤 Basic Information</h4>
            <input name="name" placeholder="Expert Name" onChange={handleChange} required />
            <input name="specialization" placeholder="Specialization (e.g. Soil Science)" onChange={handleChange} required />
            
            <div style={{ margin: "15px 0" }}>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Expert Photo:</label>
              <input type="file" accept="image/*" onChange={handleFileChange} required />
            </div>

            <div className="flex-row">
              <input name="experience" placeholder="Experience (e.g. 5 Years)" onChange={handleChange} />
              <input name="education" placeholder="Education (e.g. PhD)" onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <h4>📅 Availability & Fees</h4>
            <div className="flex-row">
              <input type="number" name="fees" placeholder="Consultation Fee (₹)" onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
            </div>

            {/* Slots Input */}
            <div style={{ marginTop: "15px" }}>
              <label style={{ fontWeight: "bold" }}>Available Slots (Comma Separated):</label>
              <input 
                name="slots" 
                value={form.slots}
                placeholder="e.g. 09:00 AM, 11:00 AM, 05:00 PM" 
                onChange={handleChange} 
                style={{ marginTop: "5px" }}
              />
            </div>

            {/* Online Status Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px", background: "#f0fdf4", padding: "10px", borderRadius: "8px" }}>
              <input 
                type="checkbox" 
                name="isOnline" 
                checked={form.isOnline} 
                onChange={handleChange} 
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              <label style={{ fontWeight: "bold", color: "#064e3b" }}>Mark as "Online Now" (Green Dot)</label>
            </div>
          </div>

          <button type="submit" className="btn-submit">Register Expert</button>
        </form>
      </div>
    </div>
  );
}

export default AdminExpertForm;