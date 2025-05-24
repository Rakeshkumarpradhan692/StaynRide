const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController.js");
const Booking = require("../controllers/BookingController.js");
const feedbackController = require("../controllers/feedbackController.js");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/user/:id", userController.getUserById);
router.put("/update", userController.updateUser);

router.get("/get-booking/:id", Booking.getBookingByUserId);

router.post("/create-feedback", feedbackController.createFeedback);

module.exports = router;
