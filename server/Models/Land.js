


const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
    state: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    village: { type: String, required: true, trim: true },
    landType: {
      type: String,
      enum: ["Irrigated", "Non-Irrigated", "Rainfed", "Organic", "Horticulture", "Pasture", "Mixed"],
      required: true,
    },
    area: { type: Number, required: true },
    areaUnit: { type: String, enum: ["acre", "bigha"], default: "acre" },
    rentAmount: { type: Number, required: true },
    rentUnit: { type: String, enum: ["per month", "per year"], required: true },
    duration: { type: String, required: true },
    customDuration: { type: String },
    ownerName: { type: String, required: true, trim: true },
    ownerPhone: { type: String, required: true },
    about: { type: String, maxlength: 500 },
    imageUrl: { type: String }, //  Photo ke liye field add ki
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved", 
    },
    owner: { type: mongoose.Schema.ObjectId, ref: "User" } // Auth ke liye
  }, { timestamps: true });

module.exports = mongoose.model("Land", landSchema);