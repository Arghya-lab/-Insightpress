const express = require('express')
const fetchUser = require('../middleware/fetchUser')
const { uploadBlog, getSingleBlog ,getBlogs, getAuthorBlogs, updateBlog, deleteBlog } = require('../controllers/blog')

const router = express.Router()

// posting a new blog using : POST /api/blog  => token require
router.post("/", fetchUser, uploadBlog)

// get a blog using : GET /api/blog/:id
router.get("/:id", getSingleBlog)

// get all blogs using : GET /api/blog
router.get("/", getBlogs)

// get all blogs of a author using : GET /api/blog/author/:id
router.get("/author/:id", getAuthorBlogs)

// update a blog using : PUT /api/blog/:id  => token require
router.put("/:id", fetchUser, updateBlog)

// delete a blog using : DELETE /api/blog/:id  => token require
router.delete("/:id", fetchUser, deleteBlog)


module.exports = router