const express = require('express')
const { uploadBlog, getSingleBlog ,getBlogs } = require('../controllers/blog')

const router = express.Router()

// posting a new blog using : POST /api/blog
router.post("/", uploadBlog)

// get a blog using : GET /api/blog/:id
router.get("/:id", getSingleBlog)

// get all blogs using : GET /api/blog
router.get("/", getBlogs)

// get all blogs of a author using : GET /api/blog/author/:id
// router.get("/author/:id", getBlogs)

// update a blog using : PATCH /api/blog/:id
// router.patch("/:id", updateBlog)

// delete a blog using : DELETE /api/blog/:id
// router.delete("/:id", deleteBlog)


module.exports = router