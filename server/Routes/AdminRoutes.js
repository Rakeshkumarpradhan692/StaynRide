const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController.js");
const hotelController = require("../controllers/HotelsController.js");
const cabController = require("../controllers/CabController.js");
const bannerController = require("../controllers/BannerController.js");
const userController = require("../controllers/UserController.js");
const roomController = require("../controllers/RoomeController.js");
const Booking = require("../controllers/BookingController.js");
const feedbackController = require("../controllers/feedbackController.js");

router.post("/login", adminController.adminLogin);

router.post("/create-banner", bannerController.createBanner);
router.put("/update-banner", bannerController.updateBanner);
router.delete("/delete-banner", bannerController.deleteBanner);

router.post("/create-cab", cabController.createCab);
router.put("/update-cab", cabController.updateCab);
router.delete("/delete-cab", cabController.deleteCab);

router.post("/create-hotel", hotelController.createHotel);
router.put("/update-hotel", hotelController.updateHotel);
router.delete("/delete-hotel", hotelController.deleteHotel);

router.post("/create-room", roomController.createRoom);
router.get("/roomBy-HotelId/:hotelId", roomController.getRoomsByHotelId);
router.put("/update-room", roomController.updateRoom);
router.delete("/delete-room", roomController.deleteRoom);

router.post("/create-user", userController.signup);
router.get("/all-users", userController.getAllUsers);
router.put("/update-user", userController.updateUser);
router.delete("/delete-user", userController.deleteUser);

router.put("/update-booking", Booking.updateBooking);
router.get("/all-booking", Booking.getAllBookings);
router.get("/one-booking/:id", Booking.getBookingById);
router.delete("/delete-booking/", Booking.deleteBooking);

router.put("/update-feedback", feedbackController.updateFeedback);
router.delete("/delete-feedback", feedbackController.deleteFeedback);

module.exports = router;
