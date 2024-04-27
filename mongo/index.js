const mongoose = require("mongoose");
const CONFIG = require("../config");

const connectToDB = async () => {
  try {
    await mongoose.connect(CONFIG.MONGO_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("could not connect to MongoDB database");
  }
};

module.exports.mongo = {
  connectToDB,
};
