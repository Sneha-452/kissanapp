
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddWarehouse.css"; 

function AddLand() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    state: "", district: "", village: "",
    landType: "", area: "", rentAmount: "",
    rentUnit: "per month", duration: "",
    customDuration: "", ownerName: "",
    ownerPhone: "", about: "",
    imageUrl: "" 
  });

  const [imageFile, setImageFile] = useState(null); 

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

  if (imageFile) formData.append("landImage", imageFile);

  try {
    const res = await fetch("https://kissanapp.onrender.com/api/lands", {
      method: "POST",

      body: formData, 
    });
    const result = await res.json();
    if (result.success) {
      alert("Land added successfully!");
      navigate("/khetrent");
    }
  } catch (err) { alert("Server error"); }
};

  return (
    <div className="add-w-page">
      <div className="add-w-container">
        <div className="add-w-header">
          <h2>🚜 Add Your Land for Rent</h2>
          <p>Provide details to help farmers find your land</p>
        </div>

        <form className="add-w-form" onSubmit={handleSubmit}>
      
          <div className="form-section">
            <h4>📍 Location & Photo</h4>
            
        
            <div className="file-upload-wrapper">
              <label className="custom-file-upload">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                📁 Upload Land Photo
              </label>
              {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="upload-preview" />}
            </div>

            <div className="flex-row">
              <input name="state" placeholder="State" onChange={handleChange} required />
              <input name="district" placeholder="District" onChange={handleChange} required />
            </div>
            <input name="village" placeholder="Village Name" onChange={handleChange} required />
          </div>

          <div className="form-section">
            <h4>🌾 Land Information</h4>
            <select name="landType" onChange={handleChange} required>
              <option value="">Select Land Type</option>
              <option value="Irrigated">Irrigated</option>
              <option value="Non-Irrigated">Non-Irrigated</option>
              <option value="Rainfed">Rainfed</option>
            </select>
            <input type="number" name="area" placeholder="Area (Acre)" onChange={handleChange} required />
          </div>

          <div className="form-section">
            <h4>💰 Rent & Duration</h4>
            <div className="flex-row">
              <input type="number" name="rentAmount" placeholder="Rent Amount" onChange={handleChange} required />
              <select name="rentUnit" onChange={handleChange} required>
                <option value="per month">Per Month</option>
                <option value="per year">Per Year</option>
              </select>
            </div>
            <select name="duration" onChange={handleChange} required>
              <option value="">Select Duration</option>
              <option value="1 Year">1 Year</option>
              <option value="custom">Custom</option>
            </select>
            {form.duration === "custom" && <input name="customDuration" placeholder="Enter Duration" onChange={handleChange} />}
          </div>

          <div className="form-section">
            <h4>👤 Contact Details</h4>
            <input name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
            <input type="tel" name="ownerPhone" placeholder="Mobile Number" onChange={handleChange} required />
            <textarea name="about" placeholder="Tell about soil quality..." onChange={handleChange}></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/khetrent")}>Cancel</button>
            <button type="submit" className="btn-submit">List Land Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLand;