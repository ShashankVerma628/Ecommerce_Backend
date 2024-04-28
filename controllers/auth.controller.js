const CONFIG = require("../config");
const httpStatus = require("http-status");
const { redis } = require("../redis");
const { generateOTPBody } = require("../redis/otpBody");
const { sendOtpEmail } = require("../email/otp");
const { authServices } = require("../services");
const { generateUsername, generateOTP } = require("../utils");
const catchAsync = require("../utils/catchAsync");
const { generateAuthTokens } = require("../services/token.service");

const sendOtp = catchAsync(async (req, res) => {
  const { email } = req.body;
  const cachedOtp = await redis.get(
    redis.getRedisKey(redis.REDIS_KEYS.REDIS_OTP, email)
  );
  if (cachedOtp) {
    const sentMail = await sendOtpEmail(email, cachedOtp.otp);
    if (sentMail) {
      return res
        .send({
          success: true,
          message: "OTP sent successfully",
        })
        .status(httpStatus.OK);
    } else {
      return res
        .send({ success: false, message: "Could not send email" })
        .status(httpStatus.BAD_REQUEST);
    }
  } else {
    const key = redis.getRedisKey(redis.REDIS_KEYS.REDIS_OTP, email);
    const otp = generateOTP();
    const value = generateOTPBody(email, otp, 0);

    const sentMail = await sendOtpEmail(email, otp);
    if (sentMail) {
      redis.set(key, value, CONFIG.OTP_EXPIRATION_TIME);
      return res
        .send({
          success: true,
          message: "OTP sent successfully",
        })
        .status(httpStatus.OK);
    } else {
      return res
        .send({ success: false, message: "Could not send email" })
        .status(httpStatus.BAD_REQUEST);
    }
  }
});

const verifyOtp = catchAsync(async (req, res) => {
  const { otp, email } = req.body;
  const cachedOtp = await redis.get(
    redis.getRedisKey(redis.REDIS_KEYS.REDIS_OTP, email)
  );
  if (cachedOtp) {
    if (cachedOtp.otp !== otp) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        success: false,
        message: "Invalid OTP!",
      });
    } else {
      const user = await authServices.userInfoService(email);
      redis.remove(redis.getRedisKey(redis.REDIS_KEYS.REDIS_OTP, email));
      if (user) {
        const token = await generateAuthTokens(user._id, user);

        return res.status(httpStatus.OK).send({
          success: true,
          message: "Logged in Successfully",
          user,
          ...token,
        });
      } else {
        const newUser = await authServices.newUserService(
          email,
          generateUsername(email)
        );
        if (!newUser) {
          return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ success: false, message: "Something went wrong" });
        }
        const token = await generateAuthTokens(newUser._id, newUser);
        return res.status(httpStatus.OK).send({
          success: true,
          message: "Logged in Successfully",
          user: newUser,
          ...token,
        });
      }
    }
  } else {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ success: false, message: "OTP Expired" });
  }
});

module.exports = { sendOtp, verifyOtp };
