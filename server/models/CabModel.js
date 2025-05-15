const mongoose = require("mongoose");

const cabSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Cab name is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Car model is required"],
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "cabs" }
);

module.exports = mongoose.model("Cab", cabSchema);
