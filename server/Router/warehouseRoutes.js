
const express = require("express"); // 1. Express import karein
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addWarehouse, getWarehouses, requestStorage } = require("../Controllers/warehouseController");

// Photo kahan aur kaise save hogi uska logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ye folder aapko apne backend folder mein manually banana hoga
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Photo ka naam unique banane ke liye date add kar di
  },
});

const upload = multer({ storage: storage });

// Route mein 'upload.single' add kiya taaki ye ek photo accept kare
router.post("/", upload.single("warehouseImage"), addWarehouse); 
router.get("/", getWarehouses);
router.post("/request", requestStorage);

module.exports = router;