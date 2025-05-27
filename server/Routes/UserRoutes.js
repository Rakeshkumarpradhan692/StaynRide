const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController.js");
const Booking = require("../controllers/BookingController.js");
const feedbackController = require("../controllers/feedbackController.js");
const BookingController = require("../controllers/BookingController.js");
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.put("/forgetpass", userController.forgetPassword);
router.put("/forgetpasslogin", userController.forgetPasswordLogin);
router.get("/getcabbooking/:cabId", BookingController.getBookingsByCabId);
router.get("/gethotelbooking/:hotelId", BookingController.getBookingsByHotelId);
router.put("/update-user", userController.updateUser);
router.get("/get-booking/:id", Booking.getBookingByUserId);
router.get("/get-user/:id", userController.getUserById);

router.post("/create-feedback", feedbackController.createFeedback);

module.exports = router;
