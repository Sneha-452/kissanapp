const express = require("express");
const router = express.Router();
// Check karein ki path sahi hai (../Controllers/WaterController)
const { addTubewell, getNearbyTubewells } = require("../Controllers/WaterController");

// Agar upar wala line 'undefined' dega toh hi crash hota hai
console.log("Add function check:", addTubewell); // Debugging ke liye

router.post("/add", addTubewell);
router.get("/nearby", getNearbyTubewells);

module.exports = router;