const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 20,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatarImgName: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    min: 3,
    max: 30,
  },
  password: {
    type: String,
    min: 6,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
