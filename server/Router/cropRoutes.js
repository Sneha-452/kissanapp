const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addCrop, getAllCrops } = require("../Controllers/cropController");

// Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, "crop-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Routes
router.post("/", upload.single("cropImage"), addCrop); 
router.get("/", getAllCrops);

module.exports = router;