const mongoose = require("mongoose");

const mongooseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Please provide username"],
      unique: true,
    },
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
  },
  { timestamps: true }
);

const User = mongoose.model("user", mongooseSchema);

module.exports = User;
