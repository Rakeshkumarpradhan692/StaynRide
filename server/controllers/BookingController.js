const Booking = require("../models/Bookingmodel.js");

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({
      success: true,
      message: "Booking created",
      data: booking,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create booking",
      error: err.message,
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    console.log(req.body.payload);
    const { id, ...updatedata } = req.body.payload;

    const result = await Booking.findByIdAndUpdate(id, updatedata, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred in booking update",
      error: err.message,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
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

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "name email")
      .populate("hotelBooking.hotelId", "name city price")
      .populate("hotelBooking.roomID", "roomNumber roomType price")
      .populate("cabBooking.cabId", "name model");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: err.message,
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.body.id);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
      error: err.message,
    });
  }
};

exports.getBookingByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Booking.find({ userId: id })
      .populate("hotelBooking.hotelId", "name city price")
      .populate("hotelBooking.roomID", "roomNumber roomType price")
      .populate("cabBooking.cabId", "name model");

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user bookings",
      error: err.message,
    });
  }
};
