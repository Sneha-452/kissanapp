const Expert = require("../Models/Expert");

// ➕ Add Expert Logic
exports.addExpert = async (req, res) => {
  try {
    const expertData = req.body;
    if (req.file) {
      // Server path for the uploaded file
      expertData.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }
    const expert = await Expert.create(expertData);
    res.status(201).json({ success: true, data: expert });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 📋 Get Experts Logic (Yahi miss ho raha hoga)
exports.getExperts = async (req, res) => {
  try {
    const experts = await Expert.find({ isAvailable: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: experts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching experts" });
  }
};