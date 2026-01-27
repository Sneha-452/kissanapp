const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  cropName: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true }, // kg mein
  price: { type: Number, required: true },    // ₹ per kg
  qualityGrade: { 
    type: String, 
    enum: ["A Grade", "B Grade", "C Grade"], 
    default: "A Grade" 
  },
  location: { type: String, required: true, trim: true },
  state: { type: String, trim: true }, // Filter ke liye
  district: { type: String, trim: true }, // Filter ke liye
  farmerName: { type: String, required: true, trim: true },
  farmerPhone: { type: String, required: true },
  imageUrl: { 
    type: String, 
    default: "https://images.unsplash.com/photo-1595244712601-3965d29b04f1?q=80&w=1000" 
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Crop", cropSchema);