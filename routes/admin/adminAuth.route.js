const express = require("express");
const { adminAuthControllers } = require("../../controllers");
const router = express.Router();

router.route("/send_otp").post(adminAuthControllers.sendOtp);

router.route("/verify_otp").post(adminAuthControllers.verifyOtp);

module.exports = router;
