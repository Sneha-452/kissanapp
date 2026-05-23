const Machinery = require("../Models/Machinery");

exports.addMachinery = async (req, res) => {
  try {
    let toolData = req.body;
    if (req.file) {
      toolData.imageUrl = `https://kissanapp.onrender.com/uploads/${req.file.filename}`;
    }
    const tool = await Machinery.create(toolData);
    res.status(201).json({ success: true, message: "Tool added successfully!", data: tool });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllMachinery = async (req, res) => {
  try {
    const { state, district, category, minRent, maxRent } = req.query;
    let query = {};

    if (state) query.state = state;
    if (district) query.district = district;
    if (category) query.category = category;

    if (minRent || maxRent) {
      query.rentPrice = {};
      if (minRent) query.rentPrice.$gte = Number(minRent);
      if (maxRent) query.rentPrice.$lte = Number(maxRent);
    }

    const tools = await Machinery.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: tools });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch tools" });
  }
};