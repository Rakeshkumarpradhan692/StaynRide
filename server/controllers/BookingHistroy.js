const BookingHistory = require("../models/BookingHistory.js");

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingHistory.find()
      .populate("userId", "name email")
      .populate("hotelBooking.hotelId", "name city price")
      .populate("hotelBooking.roomID", "roomNumber roomType price")
      .populate("cabBooking.cabId", "name model");

    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: err.message,
    });
  }
};
