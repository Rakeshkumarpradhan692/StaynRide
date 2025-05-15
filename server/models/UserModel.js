const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    number: {
      type: Number,
      required: [true, "Password is required"],
      minlength: 6,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    country: {
      type: String,
      required: [true, "Location is required"],
    },
    state: {
      type: String,
      required: [true, "Location is required"],
    },
    district: {
      type: String,
      required: [true, "Location is required"],
    },
    city: {
      type: String,
      required: [true, "Location is required"],
    },
    address: {
      type: String,
      required: [true, "City is required"],
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("Users", userSchema);
