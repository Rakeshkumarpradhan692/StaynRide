const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User ID is required"],
    },
    hotelBooking: {
      isHotelBooked: {
        type: Boolean,
        default: false,
      },
      hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
      roomID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
      totalGuests: Number,
    },

    cabBooking: {
      isCabBooked: {
        type: Boolean,
        default: false,
      },
      cabId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cab",
      },
      pickupLocation: String,
      dropLocation: String,
      travelDate: Date,
    },

    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    status: {
      type: String,
      enum: ["success", "pending", "reject"],
      default: "pending",
      rrequired: [true, "status is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "bookings" }
);

module.exports = mongoose.model("Booking", bookingSchema);
