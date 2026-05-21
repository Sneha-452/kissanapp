const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// Controller import
const { addExpert, getExperts } = require("../Controllers/ExpertController");

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), addExpert);
router.get("/", getExperts); // Yahan check karein 'getExperts' undefined na ho

module.exports = router;