const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addMachinery, getAllMachinery } = require("../Controllers/machineryController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, "tool-" + Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage: storage });

router.post("/", upload.single("toolImage"), addMachinery); 
router.get("/", getAllMachinery);

module.exports = router;