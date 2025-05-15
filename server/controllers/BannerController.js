const Banner = require("../models/bannerModel.js");

exports.createBanner = async (req, res) => {
  try {
    const banner = new Banner(req.body);
    const savedBanner = await banner.save();
    res
      .status(201)
      .json({ message: "Banner created successfully", banner: savedBanner });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBannerById = async (req, res) => {
  try {
    const { _id } = req.body;
    const banner = await Banner.findById(_id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { id, updateData } = req.body;
    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updatedBanner)
      return res.status(404).json({ message: "Banner not found" });

    res
      .status(200)
      .json({ message: "Banner updated successfully", banner: updatedBanner });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedBanner = await Banner.findByIdAndDelete(_id);
    if (!deletedBanner)
      return res.status(404).json({ message: "Banner not found" });

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
