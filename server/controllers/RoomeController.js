const Room = require("../models/RoomModel");

exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(201).json({
      message: "Room created successfully",
      room: savedRoom,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong while creating the room",
      error: err.message,
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
