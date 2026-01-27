const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { addLand, getLands } = require("../Controllers/LandController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, "uploads/"); },
  filename: (req, file, cb) => { cb(null, "land-" + Date.now() + path.extname(file.originalname)); },
});
const upload = multer({ storage: storage });

/* Add Land  */
router.post("/", upload.single("landImage"), addLand); 

/* Get Lands */
router.get("/", getLands);

module.exports = router;
