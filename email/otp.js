const sendEmail = require(".");
const CONFIG = require("../config");

const sendOtpEmail = async (email, otp) => {
  return await sendEmail({
    to: email,
    subject: `Login OTP via ${CONFIG.PROJECT_NAME}`,
    message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
  });
};

module.exports = { sendOtpEmail };
