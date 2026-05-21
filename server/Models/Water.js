const mongoose = require("mongoose");

const waterSchema = new mongoose.Schema({
  ownerName: { 
    type: String, 
    required: true,
    trim: true 
  },
  locationName: { 
    type: String, 
    required: true, 
    trim: true,
    lowercase: true // Search ko asaan banane ke liye
  }, 
  location: {
    type: { 
      type: String, 
      enum: ["Point"], 
      default: "Point" 
    },
    coordinates: { 
      type: [Number], 
      required: true // [longitude, latitude]
    }, 
  },
  hourlyRate: { 
    type: Number, 
    required: true 
  },
  hp: { 
    type: String,
    default: "Not Specified"
  }, 
  fuelType: { 
    type: String, 
    enum: ['Electric', 'Diesel', 'Solar'],
    default: 'Electric'
  },
  pipeAvailable: { 
    type: Boolean, 
    default: false 
  }, 
  contactNumber: { 
    type: String, 
    required: true 
  },
  isAvailable: { 
    type: Boolean, 
    default: true 
  },
}, { timestamps: true });

// ✅ 1. Geospatial Index (Range Search ke liye)
waterSchema.index({ location: "2dsphere" }); 

// ✅ 2. Text Index (Village Name search fast karne ke liye)
waterSchema.index({ locationName: "text", ownerName: "text" });

module.exports = mongoose.model("Water", waterSchema);