const mongoose = require("mongoose");

const seedSchema = new mongoose.Schema({
  seedName: { type: String, required: true, trim: true },
  category: { type: String, required: true }, // e.g., Grains, Vegetables, Fruits
  price: { type: Number, required: true },    // Price per kg/packet
  quantityAvailable: { type: Number, required: true },
  variety: { type: String }, // e.g., Hybrid, Desi
  location: { type: String, required: true },
  state: { type: String },
  district: { type: String },
  sellerName: { type: String, required: true },
  sellerPhone: { type: String, required: true },
  imageUrl: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Seed", seedSchema);