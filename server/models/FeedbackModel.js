const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  { timestamps: true, collection: "feedbacks" }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
