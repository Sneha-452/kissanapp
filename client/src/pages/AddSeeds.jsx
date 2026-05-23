import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddWarehouse.css"; 

function AddSeeds() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    seedName: "",
    category: "",
    variety: "", 
    price: "", 
    quantityAvailable: "",
    location: "",
    state: "",
    district: "",
    sellerName: "",
    sellerPhone: "",
    description: "",
    imageUrl: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const categories = ["Vegetables", "Grains", "Fruits", "Pulses", "Oilseeds", "Fodder"];

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
      formData.append("seedImage", imageFile); 
    }

    try {
      const res = await fetch("https://kissanapp.onrender.com/api/seeds", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Seeds listing posted successfully!");
        navigate("/seeds");
      }
    } catch (err) {
      alert("Failed to list seeds. Server error check karein.");
    }
  };

  return (
    <div className="add-w-page">
      <div className="add-w-container">
        <div className="add-w-header">
          <h2>🌱 List Your Seeds for Sale</h2>
          <p>Reach farmers directly by listing high-quality certified seeds</p>
        </div>

        <form className="add-w-form" onSubmit={handleSubmit}>
       
          <div className="form-section">
            <h4>📦 Seed Information & Photo</h4>
            <input 
              type="text" 
              name="seedName" 
              placeholder="Seed Name (e.g. Hybrid Wheat HD-2967)" 
              onChange={handleChange} 
              required 
            />
            
            <div className="file-upload-wrapper">
              <label className="custom-file-upload">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                📁 Upload Seeds Photo
              </label>
              {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="upload-preview" />}
            </div>

            <div className="flex-row">
              <select name="category" onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input 
                type="text" 
                name="variety" 
                placeholder="Variety (e.g. Hybrid / Desi)" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

       
          <div className="form-section">
            <h4>💰 Pricing & Stock Details</h4>
            <div className="flex-row">
              <input 
                type="number" 
                name="price" 
                placeholder="Price (₹ per kg/packet)" 
                onChange={handleChange} 
                required 
              />
              <input 
                type="number" 
                name="quantityAvailable" 
                placeholder="Total Stock (kg/packets)" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

       
          <div className="form-section">
            <h4>📍 Seller Location</h4>
            <div className="flex-row">
              <input type="text" name="state" placeholder="State" onChange={handleChange} required />
              <input type="text" name="district" placeholder="District" onChange={handleChange} required />
            </div>
            <input type="text" name="location" placeholder="Full Address / Shop Name" onChange={handleChange} required />
          </div>

    
          <div className="form-section">
            <h4>👤 Contact Information</h4>
            <input type="text" name="sellerName" placeholder="Seller / Shop Name" onChange={handleChange} required />
            <input type="tel" name="sellerPhone" placeholder="Mobile Number" onChange={handleChange} required />
            <textarea 
              name="description" 
              placeholder="Describe seed quality, germination rate, or certification details..." 
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/seeds")}>Cancel</button>
            <button type="submit" className="btn-submit">Post Seed Listing</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSeeds;