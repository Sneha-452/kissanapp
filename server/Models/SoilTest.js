const mongoose = require("mongoose");

const soilTestSchema = new mongoose.Schema({
  farmerName: { type: String, required: true },
  farmerPhone: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  village: { type: String, required: true },
  testType: { type: String, enum: ["Basic", "Advanced", "Fruit-Specific"], default: "Basic" },
  preferredDate: { type: Date, required: true },
  landArea: { type: Number },
  mainCrop: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ["Pending", "In-Progress", "Completed"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("SoilTest", soilTestSchema);