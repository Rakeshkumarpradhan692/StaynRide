const express = require("express");
const router = express.Router();
const cabController = require("../controllers/CabController.js");
const hotelController = require("../controllers/HotelsController.js");
const bannerController = require("../controllers/BannerController.js");

router.get("/all-banners", bannerController.getAllBanners);
router.post("/banner", bannerController.getBannerById);

router.get("/all-cabs", cabController.getAllCabs);
router.post("/cab", cabController.getCabById);

router.get("/all-hotels", hotelController.getAllHotels);
router.post("/hotel", hotelController.getHotelById);

module.exports = router;
