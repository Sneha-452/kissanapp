

const Land = require("../Models/Land");

exports.addLand = async (req, res) => {
  try {
    let landData = req.body;
    if (req.file) {
      landData.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }
    // Warehouse ki tarah seedha create
    const land = await Land.create(landData);

    res.status(201).json({ success: true, message: "Land added successfully", data: land });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getLands = async (req, res) => {
  try {
    const { state, district, landType, minRent, maxRent } = req.query;
    let query = { status: "approved" };

    if (state) query.state = state;
    if (district) query.district = district;
    if (landType) query.landType = landType;

    if (minRent || maxRent) {
      query.rentAmount = {};
      if (minRent) query.rentAmount.$gte = Number(minRent);
      if (maxRent) query.rentAmount.$lte = Number(maxRent);
    }

    const lands = await Land.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: lands });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch lands" });
  }
};