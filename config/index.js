const dotenv = require("dotenv");

dotenv.config();

const CONFIG = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  DEFAULT_API_VERSION: process.env.DEFAULT_API_VERSION,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER_EMAIL: process.env.SMTP_USER_EMAIL,
  SMTP_USER_PASSWORD: process.env.SMTP_USER_PASSWORD,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_MAIL: process.env.SMTP_MAIL,
  PROJECT_NAME: process.env.PROJECT_NAME,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  OTP_EXPIRATION_TIME: process.env.OTP_EXPIRATION_TIME,
  JWT_KEY: process.env.JWT_KEY,
  JWT_ACCESS_EXPIRATION_MINUTES: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  REDIS_PASS: process.env.REDIS_PASS,
};

module.exports = CONFIG;
