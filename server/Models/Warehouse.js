const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  district: { type: String, required: true, trim: true },
  pincode: { type: String, required: true },
  totalCapacity: { type: Number, required: true },
  availableSpace: { type: Number, required: true },
  cropTypes: [{ type: String }], 
  type: { 
    type: String, 
    enum: ["Cold Storage", "General"], 
    default: "General" 
  },
  charges: { type: String }, 
  ownerName: { type: String, required: true, trim: true },
  ownerPhone: { type: String, required: true },
  about: { type: String, maxlength: 500 },
  imageUrl: { 
    type: String, 
    default: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000" 
  },
  
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User", 
  }
}, { timestamps: true });

module.exports = mongoose.model("Warehouse", warehouseSchema);