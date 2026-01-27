const router = require("express").Router();
const multer = require("multer");
const { addTransport, getTransports } = require("../Controllers/transportController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, "uploads/"); },
  filename: (req, file, cb) => { cb(null, "trans-" + Date.now() + require("path").extname(file.originalname)); },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("vehicleImage"), addTransport);
router.get("/", getTransports);

module.exports = router;