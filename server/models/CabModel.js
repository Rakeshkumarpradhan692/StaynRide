const mongoose = require("mongoose");

const cabSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Cab name is required"],
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    model: {
      type: String,
      required: [true, "Car model is required"],
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
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
      fullAddress: {
        type: String,
        required: true,
      },
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "cabs" }
);

module.exports = mongoose.model("Cab", cabSchema);
