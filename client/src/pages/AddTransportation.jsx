import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddWarehouse.css"; 

function AddTransportation() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    vehicleName: "",
    vehicleType: "",
    capacity: "",
    pricePerKm: "",
    location: "",
    state: "",
    district: "",
    driverName: "",
    driverPhone: "",
    imageUrl: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const vehicleTypes = ["Mini Truck (Chota Hathi)", "Pickup Truck", "Tractor-Trolley", "Bada Truck", "Auto Rickshaw (Cargo)"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setForm({ ...form, imageUrl: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    
    Object.keys(form).forEach((key) => {
      if (key !== "imageUrl") formData.append(key, form[key]);
    });

    if (imageFile) {
      formData.append("vehicleImage", imageFile); 
    }

    try {
      const res = await fetch("http://localhost:5000/api/transportation", {
        method: "POST",
        body: formData, 
      });
      const data = await res.json();
      if (data.success) {
        alert("Vehicle listed successfully!");
        navigate("/transportation");
      }
    } catch (err) {
      alert("Error adding vehicle. Please try again.");
    }
  };

  return (
    <div className="add-w-page">
      <div className="add-w-container">
        <div className="add-w-header">
          <h2>🚛 List Your Transport Service</h2>
          <p>Register your vehicle to help farmers move their produce</p>
        </div>

        <form className="add-w-form" onSubmit={handleSubmit}>
          
          <div className="form-section">
            <h4>🚚 Vehicle Information & Photo</h4>
            <input 
              type="text" 
              name="vehicleName" 
              placeholder="Vehicle Name (e.g. Tata Ace, Bolero Pickup)" 
              onChange={handleChange} 
              required 
            />
            
            <div className="file-upload-wrapper">
              <label className="custom-file-upload">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                📁 Upload Vehicle Photo
              </label>
              {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="upload-preview" />}
            </div>

            <div className="flex-row">
              <select name="vehicleType" onChange={handleChange} required>
                <option value="">Select Vehicle Type</option>
                {vehicleTypes.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <input 
                type="number" 
                name="capacity" 
                placeholder="Capacity (in Quintals)" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

       
          <div className="form-section">
            <h4>📍 Pricing & Base Location</h4>
            <div className="flex-row">
              <input 
                type="number" 
                name="pricePerKm" 
                placeholder="Rate (₹ per KM)" 
                onChange={handleChange} 
                required 
              />
              <input type="text" name="location" placeholder="Village/Area Name" onChange={handleChange} required />
            </div>
            <div className="flex-row">
              <input type="text" name="state" placeholder="State" onChange={handleChange} required />
              <input type="text" name="district" placeholder="District" onChange={handleChange} required />
            </div>
          </div>

   
          <div className="form-section">
            <h4>👤 Driver / Owner Contact</h4>
            <input type="text" name="driverName" placeholder="Driver Name" onChange={handleChange} required />
            <input type="tel" name="driverPhone" placeholder="Mobile Number" onChange={handleChange} required />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/transportation")}>Cancel</button>
            <button type="submit" className="btn-submit">List Vehicle Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransportation;