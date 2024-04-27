const Joi = require("joi");

const sendOtpValidation = {
  body: Joi.object().keys({
    email: Joi.string().min(3).required().email(),
  }),
};

const verifyOtpValidation = {
  body: Joi.object().keys({
    otp: Joi.number().integer().min(100000).max(999999).required(),
    email: Joi.string().min(3).required().email(),
  }),
};

module.exports = { sendOtpValidation, verifyOtpValidation };
