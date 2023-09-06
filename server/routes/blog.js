const express = require('express')
const { uploadBlog, getSingleBlog ,getBlogs } = require('../controllers/blog')

const router = express.Router()

// posting a new blog using : POST /api/blog
router.post("/", uploadBlog)

// get a blog using : GET /api/blog/:id
router.get("/:id", getSingleBlog)

// get all blog using : GET /api/blog
router.get("/", getBlogs)

// update a blog using : PATCH /api/blog/:id
// router.patch("/:id", getSingleBlog)

// delete a blog using : DELETE /api/blog/:id
// router.delete("/:id", getSingleBlog)


module.exports = router