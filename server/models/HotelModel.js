const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    hotelType: {
      type: String,
      enum: ["Luxury", "Standard", "Deluxe"],
      required: [true, "Hotel type is required"],
    },
    name: {
      type: String,
      required: [true, "Hotel name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    state: {
      type: String,
      required: [true, "City is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    district: {
      type: String,
      required: [true, "District is required"],
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
    },
    address: {
      type: String,
      required: [true, "City is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: "Please provide a valid 10-digit contact number.",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    images: [
      {
        type: String,
      },
    ],
    rooms: {
      type: Number,
      required: [true, "City is required"],
    },
    amenities: [
      {
        type: String,
        enum: [
          "WiFi",
          "AC",
          "TV",
          "Parking",
          "Pool",
          "Kitchen",
          "Gym",
          "Restaurant",
          "Spa",
          "Bar",
          "Laundry",
        ],
      },
    ],
    checkInTime: {
      type: String,
      required: [true, "Check-in time is required"],
    },
    checkOutTime: {
      type: String,
      required: [true, "Check-out time is required"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Rating is required"],
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
