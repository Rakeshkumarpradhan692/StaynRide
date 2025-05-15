const express = require("express");
const router = express.Router();
const cabController = require("../controllers/CabController.js");
const hotelController = require("../controllers/HotelsController.js");
const bannerController = require("../controllers/BannerController.js");
const roomController = require("../controllers/RoomeController.js");
const feedbackController = require("../controllers/feedbackController.js");
const Booking = require("../controllers/BookingController.js");

router.get("/all-banners", bannerController.getAllBanners);
router.get("/banner", bannerController.getBannerById);

router.get("/all-cabs", cabController.getAllCabs);
router.get("/cabbyID/:id", cabController.getCabById);

router.get("/all-room", roomController.getAllRooms);
router.get("/roombyID/:id", roomController.getRoomById);

router.get("/all-hotels", hotelController.getAllHotels);
router.get("/hotel/:id", hotelController.getHotelById);

router.post("/create-booking", Booking.createBooking);

router.get("/get-feedback", feedbackController.getFeedback);
router.post("/create-feedback", feedbackController.createFeedback);

module.exports = router;
