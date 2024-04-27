var Redis = require("ioredis");
const CONFIG = require("../config");

const redis = new Redis({
  host: CONFIG.REDIS_HOST,
  port: CONFIG.REDIS_PORT,
  // options: {
  //   password: CONFIG.REDIS_PASS,
  // },
  password: CONFIG.REDIS_PASS,
});

redis.on("connect", () => {
  console.log("Redis client is initiating a connection to the server.");
});

redis.on("ready", () => {
  console.log("Redis client successfully initiated connection to the server.");
});

redis.on("reconnecting", () => {
  console.log("Redis client is trying to reconnect to the server...");
});

redis.on("error", (err) => console.log("Redis Client Error", err));

// Set a value in Redis
const set = async (key, value, expirationInMin = 1) => {
  try {
    await redis.set(key, JSON.stringify(value));
    // Set the expiry time for the key
    if (expirationInMin) {
      await redis.expire(key, expirationInMin * 60);
    }
    return true;
  } catch (err) {
    console.error(`Error setting value for key: ${key}`, err);
  }
};

// Get a value from Redis
const get = async (key) => {
  try {
    const value = await redis.get(key);
    return JSON.parse(value);
  } catch (err) {
    console.error(`Error retrieving value for key: ${key}`, err);
    return null;
  }
};

// Remove a key from Redis
const remove = async (key) => {
  try {
    const result = await redis.del(key);
    return JSON.parse(result);
  } catch (err) {
    console.error(`Error removing key from Redis: ${key}`, err);
    return null;
  }
};

/**
 * @typedef {Object} RedisKeys
 * @property {string} REDIS_USER_DETAILS - Redis key for user details
 * @property {string} REDIS_PRODUCT_DETAILS - Redis key for product details
 * @property {string} REDIS_WEB_CONFIG - Redis key for web configuration
 */

/**
 * Redis keys object
 * @type {RedisKeys}
 */
const REDIS_KEYS = {
  REDIS_OTP: "__redis_otp__",
};

/**
 * get redis key
 * @param {string} || accept only {REDIS_KEYS}
 * @returns {string} redis key
 */

const getRedisKey = (type, value) => {
  return `${type}:${value}`;
};

module.exports.redis = {
  set,
  get,
  getRedisKey,
  REDIS_KEYS,
  remove,
  redisClient: redis,
};
