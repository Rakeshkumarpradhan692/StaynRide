const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController.js");
const Booking = require("../controllers/BookingController.js");
const feedbackController = require("../controllers/feedbackController.js");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
// router.put("/update/:id", userController.updateUser);

router.put("/update-user/:id",userController.updateUser);
router.get("/get-booking/:id", Booking.getBookingByUserId);
router.get("/get-user/:id",userController.getUserById);

router.post("/create-feedback", feedbackController.createFeedback);

module.exports = router;
