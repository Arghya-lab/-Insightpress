const User = require("../models/User")


const author = async(req, res) => {
  try {
    const { id } = req.params // author id
    const authorData = await User.findById(id)
    if (!authorData) {
      res.status(400).json({"Error": "author not found."})
    } else {
      delete authorData.password
      res.status(200).json(authorData)
    }
  } catch (error) {
    res.status(400).json(error)
  }
}



module.exports = { author }