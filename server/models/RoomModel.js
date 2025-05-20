const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    roomType: {
      type: String,
      enum: ["Single", "Double", "family"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "rooms" }
);
roomSchema.index({ hotelId: 1, roomNumber: 1 }, { unique: true });

module.exports = mongoose.model("Room", roomSchema);
