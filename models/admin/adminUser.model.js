const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_KEY, JWT_ACCESS_EXPIRATION_MINUTES } = require("../../config");
const bcrypt = require("bcryptjs");

const adminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    },
    user_role: {
      type: String,
      enum: ["admin", "super_admin"],
      required: [true, "Please provide admin type"],
      default: "admin",
    },
  },
  { timestamps: true }
);

adminUserSchema.methods.createJWT = function () {
  return jwt.sign(
    { user_id: this._id, user_role: this.user_role, email: this.email },
    JWT_KEY,
    {
      expiresIn: JWT_ACCESS_EXPIRATION_MINUTES,
    }
  );
};

const User = mongoose.model("adminUser", adminUserSchema);

module.exports = User;
