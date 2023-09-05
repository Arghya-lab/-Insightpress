const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtKey = process.env.JWT_SECRET;

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    let data = {
      email,
      id: user._id,
    };
    const token = jwt.sign(data, jwtKey);
    res.status(200).send({name: user.name, token});

  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isCorrectPass = bcrypt.compareSync(password, user.password);
    if (isCorrectPass) {
      let data = {
        email,
        id: _id,
      };
      const token = jwt.sign(data, jwtKey);
      res.status(200).json({name: user.name, token});
    } else {
      res.status(400).json("Incorrect credentials");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { signupUser, loginUser };
