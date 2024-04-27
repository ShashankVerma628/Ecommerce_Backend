const User = require("../models/user.model");

const newUserService = async (email, username) => {
  const newUser = await User.create({ email, username, name: "" });
  return newUser;
};

const userInfoService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  return user;
};

module.exports = { userInfoService, newUserService };
