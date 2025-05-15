const Cab = require("../models/cabModel.js");

exports.createCab = async (req, res) => {
  try {
    const cab = new Cab(req.body);
    const savedCab = await cab.save();
    res
      .status(201)
      .json({ message: "Cab created successfully", cab: savedCab });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllCabs = async (req, res) => {
  try {
    const cabs = await Cab.find();
    res.status(200).json(cabs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCabById = async (req, res) => {
  try {
    const { id } = req.params;
    const cab = await Cab.findById(id);
    if (!cab) return res.status(404).json({ message: "Cab not found" });
    res.status(200).json(cab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCab = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const updatedCab = await Cab.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updatedCab) return res.status(404).json({ message: "Cab not found" });

    res
      .status(200)
      .json({ message: "Cab updated successfully", cab: updatedCab });
  } catch (err) {
    res
      .status(400)
      .json({ meessage: "somthing is wrong trty again", error: err.message });
  }
};

exports.deleteCab = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCab = await Cab.findByIdAndDelete(id);
    if (!deletedCab) return res.status(404).json({ message: "Cab not found" });

    res.status(200).json({ message: "Cab deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
