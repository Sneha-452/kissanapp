const Seed = require("../Models/Seed");

exports.addSeed = async (req, res) => {
  try {
    let seedData = req.body;
    if (req.file) {
      seedData.imageUrl = `https://kissanapp.onrender.com/uploads/${req.file.filename}`;
    }
    const seed = await Seed.create(seedData);
    res.status(201).json({ success: true, message: "Seeds listed successfully!", data: seed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllSeeds = async (req, res) => {
  try {
    const { state, district, category, minPrice, maxPrice } = req.query;
    let query = {};

    if (state) query.state = state;
    if (district) query.district = district;
    if (category) query.category = category;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const seeds = await Seed.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: seeds });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch seeds" });
  }
};