const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addSeed, getAllSeeds } = require("../Controllers/seedController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, "seed-" + Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage: storage });

router.post("/", upload.single("seedImage"), addSeed); 
router.get("/", getAllSeeds);

module.exports = router;