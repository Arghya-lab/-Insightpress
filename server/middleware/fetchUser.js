const jwt = require('jsonwebtoken');
require("dotenv").config();

const fetchUser = (req, res, next) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    const token = req.header("auth-token");
    if (!token) {
      res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }
    
    const user = jwt.verify(token, jwtSecret);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
