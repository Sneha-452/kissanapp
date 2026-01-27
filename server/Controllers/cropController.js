const Crop = require("../Models/Crop");

// ADD CROP LISTING
exports.addCrop = async (req, res) => {
  try {
    let cropData = req.body;


    if (req.file) {
      cropData.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const crop = await Crop.create(cropData);
    
    res.status(201).json({ 
      success: true, 
      message: "Crop listed for sale successfully!", 
      data: crop 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//  GET ALL CROPS (Price & Location Filters)
exports.getAllCrops = async (req, res) => {
  try {
    const { state, district, cropType, minPrice, maxPrice } = req.query;
    let query = {};

    // Location & Crop Type Filters
    if (state) query.state = state;
    if (district) query.district = district;
    if (cropType) query.cropName = cropType;


    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const crops = await Crop.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: crops,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch crops",
    });
  }
};