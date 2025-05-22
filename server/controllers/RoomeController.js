const Room = require("../models/RoomModel");
const Hotel = require("../models/HotelModel");
const mongoose = require("mongoose");

exports.createRoom = async (req, res) => {
  try {
    const { hotelId } = req.body.payload;
    console.log(req.body.payload);
    const { roomNumber, roomType, price, images } = req.body.payload;
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hotel ID format",
      });
    }
    const hotelExists = await Hotel.findById(hotelId);
    if (!hotelExists) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }
    if (!roomNumber || !roomType || !price) {
      return res.status(400).json({
        success: false,
        message: "Please provide roomNumber, roomType, and price",
      });
    }
    const existingRoom = await Room.findOne({
      hotelId,
      roomNumber,
    });

    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: `Room number ${roomNumber} already exists in this hotel`,
      });
    }
    const validRoomTypes = ["Single", "Double", "family"];
    if (!validRoomTypes.includes(roomType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid room type. Must be one of: ${validRoomTypes.join(
          ", "
        )}`,
      });
    }
    const newRoom = await Room.create({
      hotelId,
      roomNumber,
      roomType,
      price,
      images: images || [],
    });
    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: newRoom,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating room",
      error: error.message,
    });
  }
};

exports.getRoomsByHotelId = async (req, res) => {
  try {
    console.log(req);
    const { hotelId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hotel ID format",
      });
    }

    const rooms = await Room.find({ hotelId }).sort({ roomNumber: 1 }).lean();

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No rooms found for this hotel",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching rooms",
      error: error.message,
    });
  }
};
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("hotelId", "name  hotelType");
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).populate("hotelId", "name hotelType");
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (err) {
    res.status(400).json({
      message: "Invalid data or room ID",
      error: err.message,
    });
  }
};
exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
