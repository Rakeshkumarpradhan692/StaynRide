const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    hotelType: {
      type: String,
      enum: ["Luxury", "Standard", "Deluxe"],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^[0-9]{10}$/.test(v),
        message: "Enter a valid 10-digit contact number",
      },
    },
    images: [String],
    checkInTime: {
      type: String,
      required: true,
    },
    checkOutTime: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "hotels" }
);

module.exports = mongoose.model("Hotel", hotelSchema);
