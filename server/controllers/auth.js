const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
    res.status(200).json(user);
    
  } catch (error) {
    res.status(400).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isCorrectPass = bcrypt.compareSync(password, user.password);
    if (isCorrectPass) {
      res.status(200).json(user);
    } else {
      res.status(400).json("Incorrect credentials");
    }

  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { signupUser, loginUser };
