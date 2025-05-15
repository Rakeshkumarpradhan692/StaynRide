const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/AdminController.js");
const hotelController = require("../controllers/HotelsController.js");
const cabController = require("../Controllers/CabController.js");
const bannerController = require("../controllers/BannerController.js");
const userController = require("../controllers/UserController.js");

router.post("/login", adminController.adminLogin);

router.post("/create-banner", bannerController.createBanner);
router.post("/update-banner", bannerController.updateBanner);
router.post("/delete-banner", bannerController.deleteBanner);

router.post("/create-cab", cabController.createCab);
router.post("/update-cab", cabController.updateCab);
router.post("/delete-cab", cabController.deleteCab);

router.post("/create-hotel", hotelController.createHotel);
router.post("/update-hotel", hotelController.updateHotel);
router.delete("/delete-hotel", hotelController.deleteHotel);

router.post("/create-user", userController.signup);
router.get("/all-users", userController.getAllUsers);
router.patch("/update-user", userController.updateUser);
router.delete("/delete-user", userController.deleteUser);

module.exports = router;
