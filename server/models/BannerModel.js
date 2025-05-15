const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Banner name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Banner image URL is required"],
    },
    description: {
      type: String,
      required: [true, "Banner description is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "banners" }
);

module.exports = mongoose.model("Banner", bannerSchema);
