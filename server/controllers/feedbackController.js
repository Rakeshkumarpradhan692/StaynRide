const Feedback = require("../models/FeedbackModel.js");

exports.createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to submit feedback",
      error: err.message,
    });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    console.log(req.body);
    const { _id } = req.body;
    const updatedFeedback = await Feedback.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFeedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback updated successfully",
      data: updatedFeedback,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update feedback",
      error: err.message,
    });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const result = await Feedback.find();

    res.status(200).json({
      success: true,
      message: "Feedback get successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to get feedback",
      error: err.message,
    });
  }
};
exports.deleteFeedback = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to delete feedback",
      error: err.message,
    });
  }
};
