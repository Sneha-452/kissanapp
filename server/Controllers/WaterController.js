const Water = require("../Models/Water");

// ➕ ADD TUBEWELL
exports.addTubewell = async (req, res) => {
  try {
    const { ownerName, locationName, hourlyRate, hp, fuelType, pipeAvailable, contactNumber, lat, lng } = req.body;

    const newTubewell = await Water.create({
      ownerName,
      locationName: locationName.toLowerCase(),
      hourlyRate,
      hp,
      fuelType,
      pipeAvailable,
      contactNumber,
      location: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)]
      }
    });

    res.status(201).json({ success: true, data: newTubewell });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 📋 GET NEARBY TUBEWELLS
exports.getNearbyTubewells = async (req, res) => {
  try {
    const { lat, lng, range, village } = req.query;
    let query = {};

    if (village) {
      query.locationName = { $regex: village, $options: "i" };
    }

    if (lat && lng && lat !== "undefined") {
      query.location = {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: (parseFloat(range) || 10) * 1000
        }
      };
    }

    const tubewells = await Water.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: tubewells });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};