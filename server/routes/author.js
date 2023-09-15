const express = require('express')
const fetchUser = require('../middleware/fetchUser')
const { author, addRemoveBookmark, getBookmark } = require('../controllers/author')

const router = express.Router()


// get author data using : GET /api/author/:id
router.get("/:id", author)
// add, remove a bookmark id using : PATCH /api/author/bookmark/:id  => token require
router.patch("/bookmark/:id", fetchUser, addRemoveBookmark)
// get bookmarks data using : POST /api/author/bookmark/  => token require
router.post("/bookmark", fetchUser, getBookmark)


module.exports = router