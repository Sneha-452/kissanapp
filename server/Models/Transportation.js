const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true }, 
  vehicleType: { type: String, required: true }, 
  capacity: { type: Number, required: true },    
  pricePerKm: { type: Number, required: true },
  location: { type: String, required: true },
  state: { type: String },
  district: { type: String },
  driverName: { type: String, required: true },
  driverPhone: { type: String, required: true },
  imageUrl: { type: String },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Transportation", transportSchema);