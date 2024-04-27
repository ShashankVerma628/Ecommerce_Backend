const express = require("express");
const { authControllers } = require("../controllers");
const validate = require("../middleware/validate");
const {
  sendOtpValidation,
  verifyOtpValidation,
} = require("../validations/auth.validation");

const router = express.Router();

router
  .route("/send_otp")
  .post(validate(sendOtpValidation), authControllers.sendOtp);
router
  .route("/verify_otp")
  .post(validate(verifyOtpValidation), authControllers.verifyOtp);

module.exports = router;
