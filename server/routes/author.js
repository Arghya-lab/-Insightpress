const express = require('express')
const fetchUser = require('../middleware/fetchUser')
const { author, toggleBookmark } = require('../controllers/author')

const router = express.Router()


// get author data using : GET /api/author/:id
router.get("/:id", author)
// add, remove a bookmark id using : PUT /api/author/bookmark/:id  => token require
router.put("/bookmark/:id", fetchUser, toggleBookmark)


module.exports = router