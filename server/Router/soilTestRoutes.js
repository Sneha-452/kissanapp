const express = require("express");
const router = express.Router();
const { bookSoilTest, getAllBookings } = require("../Controllers/soilTestController");


router.post("/book", bookSoilTest);


router.get("/list", getAllBookings);

module.exports = router;