const Transportation = require("../Models/Transportation");

exports.addTransport = async (req, res) => {
  try {
    let data = req.body;
    if (req.file) {
      data.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }
    const transport = await Transportation.create(data);
    res.status(201).json({ success: true, message: "Transport added!", data: transport });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getTransports = async (req, res) => {
  try {
    const { state, district, vehicleType, minCap } = req.query;
    let query = {};
    if (state) query.state = state;
    if (district) query.district = district;
    if (vehicleType) query.vehicleType = vehicleType;
    if (minCap) query.capacity = { $gte: Number(minCap) };

    const list = await Transportation.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching data" });
  }
};