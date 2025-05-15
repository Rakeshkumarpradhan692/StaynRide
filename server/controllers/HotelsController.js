const Hotel = require("../models/HotelModel.js");
const Room = require("../models/RoomModel.js");
exports.createHotel = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    const savedHotel = await hotel.save();
    res
      .status(201)
      .json({ message: "Hotel created successfully", hotel: savedHotel });
  } catch (err) {
    res
      .status(400)
      .json({ message: "somthing is wrong try later", error: err.message });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updatedHotel)
      return res.status(404).json({ message: "Hotel not found" });

    res
      .status(200)
      .json({ message: "Hotel updated successfully", hotel: updatedHotel });
  } catch (err) {
    res
      .status(400)
      .json({ message: " retrun velid ID or value", error: err.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const { id } = req.body;

    await Room.deleteMany({ hotelId: id });
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel)
      return res.status(404).json({ message: "Hotel not found" });

    res
      .status(200)
      .json({ message: "Hotel and its rooms deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
