const User = require("../../models/admin/adminUser.model");

const newUserService = async (email) => {
  const newUser = await User.create({ email });
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
