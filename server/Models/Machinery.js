const mongoose = require("mongoose");

const machinerySchema = new mongoose.Schema({
  toolName: { type: String, required: true, trim: true },
  category: { type: String, required: true }, // e.g., Tractor, Harvester, Ploughs
  rentPrice: { type: Number, required: true }, // Price per day
  condition: { type: String, default: "Good" }, 
  location: { type: String, required: true },
  state: { type: String },
  district: { type: String },
  ownerName: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  imageUrl: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Machinery", machinerySchema);