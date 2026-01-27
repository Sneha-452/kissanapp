const SoilTest = require("../Models/SoilTest");

exports.bookSoilTest = async (req, res) => {
  try {
    const newBooking = await SoilTest.create(req.body);
    res.status(201).json({
      success: true,
      message: "Soil Test booked successfully!",
      data: newBooking
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to book soil test",
      error: err.message
    });
  }
};

// Admin ke liye saari bookings dekhne ka function
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await SoilTest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};