import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddWarehouse.css";

function AddCropListing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cropName: "",
    quantity: "",
    price: "",
    qualityGrade: "A Grade",
    location: "",
    farmerName: "",
    farmerPhone: "",
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
    if (imageFile) formData.append("cropImage", imageFile);

    try {
      const res = await fetch("http://localhost:5000/api/crops", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Crop listing posted successfully!");
        navigate("/directsell");
      }
    } catch (err) {
      alert("Failed to post listing.");
    }
  };

  return (
    <div className="add-w-page">
      <div className="add-w-container">
        <div className="add-w-header">
          <h2>🌾 Post Your Crop Listing</h2>
          <p>Fill in the details to sell your produce directly to buyers</p>
        </div>

        <form className="add-w-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h4>📦 Crop Information</h4>
            <select name="cropName" onChange={handleChange} required>
              <option value="">Select Crop</option>
              {["Wheat", "Rice", "Potato", "Tomato", "Maize", "Pulses"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            <div className="file-upload-wrapper">
              <label className="custom-file-upload">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                📁 Upload Crop Photo
              </label>
              {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="upload-preview" />}
            </div>

            <div className="flex-row">
              <input type="number" name="quantity" placeholder="Quantity (kg)" onChange={handleChange} required />
              <input type="number" name="price" placeholder="Price (₹/kg)" onChange={handleChange} required />
            </div>
          </div>

          <div className="form-section">
            <h4>📍 Location & Quality</h4>
            <select name="qualityGrade" onChange={handleChange}>
              <option value="A Grade">A Grade (Premium)</option>
              <option value="B Grade">B Grade (Standard)</option>
            </select>
            <input type="text" name="location" placeholder="Village, District, State" onChange={handleChange} required />
          </div>

          <div className="form-section">
            <h4>👤 Farmer Contact</h4>
            <input type="text" name="farmerName" placeholder="Farmer Name" onChange={handleChange} required />
            <input type="tel" name="farmerPhone" placeholder="Mobile Number" onChange={handleChange} required />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/directsell")}>Cancel</button>
            <button type="submit" className="btn-submit">Post Listing Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCropListing;