const express = require('express')
const fetchUser = require('../middleware/fetchUser')
const { getAuthor, editBio, addRemoveBookmark, getBookmark, addRemoveAuthor, getFollowingFeed } = require('../controllers/author')

const router = express.Router()

/* READ AUTHOR DATA */
// get author data using : GET /api/author/:id
router.get("/:id", getAuthor)

/* UPDATE USER BIO */
// edit user bio using : PATCH /api/author/editBio  => token require
router.patch("/editBio", fetchUser, editBio)

/* READ, UPDATE BOOKMARK */
// add, remove a bookmark id using : PATCH /api/author/bookmark/:id  => token require
router.patch("/bookmark/:id", fetchUser, addRemoveBookmark)
// get bookmarks data using : GET /api/author/bookmark  page=> query  => token require
router.post("/bookmark", fetchUser, getBookmark)

/* UPDATE FOLLOWER & READ FOLLOWER POST */
// add, remove author id using : PATCH /api/author/following/:id  => token require
router.patch("/following/:id", fetchUser, addRemoveAuthor)
// get following author data using : POST /api/author/following/feed  page=> query  => token require
router.post("/following/feed", fetchUser, getFollowingFeed)


module.exports = router
