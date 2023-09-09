const express = require('express')
const { signupUser, loginUser} = require('../controllers/auth')
const multer  = require('multer')

const router = express.Router()

// multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/avatar")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })


// signup using : POST api/auth/signup
router.post("/signup", upload.single("avatarImg"), signupUser)
// login using : POST api/auth/login
router.post("/login", loginUser)


module.exports = router