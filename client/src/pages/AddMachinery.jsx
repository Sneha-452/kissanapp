import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddWarehouse.css"; 

function AddMachinery() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    toolName: "",
    category: "",
    rentPrice: "",
    condition: "Good",
    location: "",
    state: "",
    district: "",
    ownerName: "",
    ownerPhone: "",
    description: "",
    imageUrl: ""
  });

  const [imageFile, setImageFile] = useState(null);

  const categories = ["Tractor", "Harvester", "Ploughs", "Seed Drills", "Irrigation Tools", "Small Tools"];

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
      formData.append("toolImage", imageFile); 
    }

    try {
      const res = await fetch("http://localhost:5000/api/machinery", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Machinery/Tool listed successfully!");
        navigate("/Machinery");
      }
    } catch (err) {
      alert("Failed to list machinery. Please try again.");
    }
  };

  return (
    <div className="add-w-page">
      <div className="add-w-container">
        <div className="add-w-header">
          <h2>🚜 List Your Machinery/Tools</h2>
          <p>Help other farmers by renting out your equipment</p>
        </div>

        <form className="add-w-form" onSubmit={handleSubmit}>
         
          <div className="form-section">
            <h4>🛠️ Tool Information & Photo</h4>
            <input 
              type="text" 
              name="toolName" 
              placeholder="Machine/Tool Name (e.g. Mahindra Tractor 575)" 
              onChange={handleChange} 
              required 
            />
            
            <div className="file-upload-wrapper">
              <label className="custom-file-upload">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                📁 Upload Machine Photo
              </label>
              {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="upload-preview" />}
            </div>

            <div className="flex-row">
              <select name="category" onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input 
                type="number" 
                name="rentPrice" 
                placeholder="Rent Price (₹ per Day)" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

        
          <div className="form-section">
            <h4>📍 Location & Condition</h4>
            <div className="flex-row">
              <input type="text" name="state" placeholder="State" onChange={handleChange} required />
              <input type="text" name="district" placeholder="District" onChange={handleChange} required />
            </div>
            <div className="flex-row">
                <input type="text" name="location" placeholder="Village/Area Name" onChange={handleChange} required />
                <select name="condition" onChange={handleChange}>
                    <option value="New">Brand New</option>
                    <option value="Good">Good Condition</option>
                    <option value="Used">Used / Working</option>
                </select>
            </div>
          </div>

         
          <div className="form-section">
            <h4>👤 Owner & Contact</h4>
            <input type="text" name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
            <input type="tel" name="ownerPhone" placeholder="Mobile Number" onChange={handleChange} required />
            <textarea 
              name="description" 
              placeholder="Tell more about the machine (Working hours, special features, etc.)" 
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/Machinery")}>Cancel</button>
            <button type="submit" className="btn-submit">List Machinery Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMachinery;