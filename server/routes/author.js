const express = require('express')
const fetchUser = require('../middleware/fetchUser')
const { author, editBio, addRemoveBookmark, getBookmark, addRemoveAuthor, getFollowingFeed } = require('../controllers/author')

const router = express.Router()

/* READ AUTHOR DATA */
// get author data using : GET /api/author/:id
router.get("/:id", author)

/* UPDATE USER BIO */
// edit user bio using : PATCH /api/author/editBio  => token require
router.patch("/editBio", fetchUser, editBio)

/* READ, UPDATE BOOKMARK */
// add, remove a bookmark id using : PATCH /api/author/bookmark/:id  => token require
router.patch("/bookmark/:id", fetchUser, addRemoveBookmark)
// get bookmarks data using : POST /api/author/bookmark/  => token require
router.post("/bookmark", fetchUser, getBookmark)

/* UPDATE FOLLOWER & READ FOLLOWER POST */
// add, remove author id using : PATCH /api/author/following/:id  => token require
router.patch("/following/:id", fetchUser, addRemoveAuthor)
// get bookmarks data using : POST /api/author/following/feed  => token require
router.post("/following/feed", fetchUser, getFollowingFeed)


module.exports = router
