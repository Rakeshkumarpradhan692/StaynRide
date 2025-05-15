const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    hotel: {
      hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
      checkInDate: Date,
      checkOutDate: Date,
      checkInTime: {
        type: String,
        default: "12:00 PM",
      },
      checkOutTime: {
        type: String,
        default: "10:00 AM",
      },
      persons: Number,
      roomsBooked: Number,
      Price: Number,
    },

    cab: {
      cabId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cab",
      },
      pickupLocation: String,
      dropLocation: String,
      travelDate: Date,
      cabFare: Number,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "bookings" }
);

module.exports = mongoose.model("Booking", bookingSchema);
