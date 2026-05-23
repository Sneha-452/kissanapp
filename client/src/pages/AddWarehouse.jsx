import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddWarehouse.css";

function AddWarehouse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    state: "",
    district: "",
    pincode: "",
    totalCapacity: "",
    availableSpace: "",
    type: "General",
    charges: "",
    ownerName: "", 
    ownerPhone: "", 
    about: "",
    imageUrl: "" 
  });

  const [selectedCrops, setSelectedCrops] = useState([]);
  const [imageFile, setImageFile] = useState(null); 

  const cropsList = ["Wheat", "Rice", "Potato", "Vegetables", "Maize", "Pulses"];

  const handleCropToggle = (crop) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter((c) => c !== crop));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      const previewUrl = URL.createObjectURL(file);
      setForm({ ...form, imageUrl: previewUrl }); 
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  
  const formData = new FormData();
  
  
  Object.keys(form).forEach((key) => {
    if (key !== "imageUrl") { 
      formData.append(key, form[key]);
    }
  });

  
  selectedCrops.forEach(crop => formData.append("cropTypes[]", crop));

  
  if (imageFile) {
    formData.append("warehouseImage", imageFile);
  }

  try {
    const res = await fetch("https://kissanapp.onrender.com/api/warehouses", {
      method: "POST",
    
      body: formData, 
    });

    const data = await res.json();
    if (data.success) {
      alert("Warehouse added successfully!");
      navigate("/warehouse");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Upload failed. Server check karein.");
  }
};

  return (
    <div className="add-w-page">
      <div className="add-w-container">
        <div className="add-w-header">
          <h2>➕ List Your Warehouse</h2>
          <p>Fill in the details to reach thousands of farmers</p>
        </div>

        <form className="add-w-form" onSubmit={handleSubmit}>
         
          <div className="form-section">
            <h4>🏢 Basic Information & Photo</h4>
            <input 
              type="text" 
              name="name" 
              placeholder="Warehouse Name" 
              onChange={handleChange} 
              required 
            />
            
           
            <div className="file-upload-wrapper">
              <label className="custom-file-upload">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                📁 Upload from Device
              </label>
              <span className="or-text">OR</span>
              <input 
                type="text" 
                name="imageUrl" 
                placeholder="Paste Image URL" 
                value={form.imageUrl}
                onChange={handleChange} 
              />
            </div>

           
            {form.imageUrl && (
              <div className="image-preview-container">
                <img src={form.imageUrl} alt="Preview" className="upload-preview" />
              </div>
            )}

            <div className="flex-row">
              <select name="type" onChange={handleChange}>
                <option value="General">General Warehouse</option>
                <option value="Cold Storage">Cold Storage</option>
              </select>
              <input 
                type="text" 
                name="charges" 
                placeholder="Charges (e.g. ₹50/Quintal)" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          
          <div className="form-section">
            <h4>📍 Location Details</h4>
            <div className="flex-row">
              <input type="text" name="state" placeholder="State" onChange={handleChange} required />
              <input type="text" name="district" placeholder="District" onChange={handleChange} required />
            </div>
            <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} required />
          </div>

          {/* Section 3: Capacity & Crops */}
          <div className="form-section">
            <h4>📦 Capacity & Crops</h4>
            <div className="flex-row">
              <input type="number" name="totalCapacity" placeholder="Total Capacity (Quintal)" onChange={handleChange} required />
              <input type="number" name="availableSpace" placeholder="Available Space (Quintal)" onChange={handleChange} required />
            </div>
            <label className="label-text">Select Suitable Crops:</label>
            <div className="crops-selection">
              {cropsList.map((crop) => (
                <div 
                  key={crop} 
                  className={`crop-chip ${selectedCrops.includes(crop) ? "active" : ""}`}
                  onClick={() => handleCropToggle(crop)}
                >
                  {crop}
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Owner & Contact */}
          <div className="form-section">
            <h4>👤 Contact Details</h4>
            <input 
              type="text" 
              name="ownerName" 
              placeholder="Owner Name" 
              onChange={handleChange} 
              required 
            />
            <input 
              type="tel" 
              name="ownerPhone" 
              placeholder="Mobile Number" 
              onChange={handleChange} 
              required 
            />
            <textarea 
              name="about" 
              placeholder="More details about security, timing, or facilities..." 
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/warehouse")}>Cancel</button>
            <button type="submit" className="btn-submit">List Warehouse Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWarehouse;