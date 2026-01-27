
const Warehouse = require("../Models/Warehouse");

// ADD WAREHOUSE (Multer support ke sath)
exports.addWarehouse = async (req, res) => {
  try {
    let warehouseData = req.body;

  
    if (req.file) {
      warehouseData.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const warehouse = await Warehouse.create(warehouseData);
    
    res.status(201).json({ 
      success: true, 
      message: "Warehouse added successfully!", 
      data: warehouse 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//  GET ALL WAREHOUSES (Numerical Filters ke sath)
exports.getWarehouses = async (req, res) => {
  try {
    const { state, district, pincode, cropType, minCap, maxCap } = req.query;
    let query = {};

    // Location Filters
    if (state) query.state = state;
    if (district) query.district = district;
    if (pincode) query.pincode = pincode;

    // Crop Type Filter ($in use karke array check karega)
    if (cropType) {
      query.cropTypes = { $in: [cropType] }; 
    }

    // Capacity Filter (String ko Number mein convert karke compare karega)
    if (minCap || maxCap) {
      query.availableSpace = {}; // Database field name
      if (minCap) query.availableSpace.$gte = Number(minCap); // Greater than or equal to
      if (maxCap) query.availableSpace.$lte = Number(maxCap); // Less than or equal to
    }

    const warehouses = await Warehouse.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: warehouses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch warehouses",
    });
  }
};

// REQUEST STORAGE (Owner Notification Logic ke sath)
exports.requestStorage = async (req, res) => {
  try {
    const { warehouseId, farmerName, farmerPhone, quantity } = req.body;
    
    // 1. Database se warehouse dhoondo taaki owner ka details mil sake
    const warehouse = await Warehouse.findById(warehouseId);

    if (!warehouse) {
      return res.status(404).json({ success: false, message: "Warehouse not found" });
    }

    // 2. Owner ka mobile aur naam nikalna
    const ownerMobile = warehouse.ownerPhone;
    const ownerName = warehouse.ownerName;

    // 3. Notification Logic (Console Log)
    console.log("-----------------------------------------");
    console.log(`NEW STORAGE REQUEST FOR: ${warehouse.name}`);
    console.log(`TO OWNER: ${ownerName} (${ownerMobile})`);
    console.log(`FROM FARMER: ${farmerName} (${farmerPhone})`);
    console.log(`QUANTITY: ${quantity} Quintal`);
    console.log("-----------------------------------------");

    res.status(200).json({
      success: true,
      message: `Request sent to ${ownerName}! They will contact you shortly.`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Request failed" });
  }
};