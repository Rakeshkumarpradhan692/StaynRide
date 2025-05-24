const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController.js");
const Booking = require("../controllers/BookingController.js");
const feedbackController = require("../controllers/feedbackController.js");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
<<<<<<< HEAD
router.put("/update/:id", userController.updateUser);

=======
router.get("/user/:id", userController.getUserById);
router.put("/update", userController.updateUser);
>>>>>>> 7c757bb553ae25e8a3a86a72d40d6349a9e5a170

router.get("/get-booking/:id", Booking.getBookingByUserId);

router.post("/create-feedback", feedbackController.createFeedback);

module.exports = router;
