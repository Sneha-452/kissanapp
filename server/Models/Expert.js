const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  specialization: { 
    type: String, 
    required: true 
  }, 
  experience: { 
    type: String 
  },
  education: { 
    type: String 
  },
  fees: { 
    type: Number, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String 
  }, 
  isAvailable: { 
    type: Boolean, 
    default: true 
  }, // Overall service availability
  isOnline: { 
    type: Boolean, 
    default: true 
  }, // Real-time status (Green dot)
  slots: { 
    type: [String], 
    default: ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"] 
  }
}, { timestamps: true });

module.exports = mongoose.model("Expert", expertSchema);