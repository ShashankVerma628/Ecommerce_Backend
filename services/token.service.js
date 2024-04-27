const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const httpStatus = require("http-status");
const { JWT_KEY, JWT_ACCESS_EXPIRATION_MINUTES } = require("../config");

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} username
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, username) => {
  const payload = jwt.verify(token, JWT_KEY);
  if (!payload) {
    throw new Error("Token not found");
  }
  return payload;
};

/**
 * @param {ObjectID} userid
 * @param {dayjs} expires
 * @param {string} username
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userid, expires, user, secret = JWT_KEY) => {
  const payload = {
    sub: userid,
    iat: dayjs().unix(),
    exp: expires.unix(),
    user,
  };
  return jwt.sign(payload, secret);
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (userid, user) => {
  const accessTokenExpires = dayjs().add(
    JWT_ACCESS_EXPIRATION_MINUTES,
    "minutes"
  );
  const accessToken = generateToken(userid, accessTokenExpires, user);
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

module.exports = { generateToken, generateAuthTokens, verifyToken };
