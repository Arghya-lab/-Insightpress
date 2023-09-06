const Blog = require('../models/Blog')

// Create
const uploadBlog = async (req, res) => {
  try {
    const { author, title, summary, content } = req.body
    const blogData = await Blog.create({
      author,
      title,
      summary,
      content,
    })
    res.status(200).json(blogData)
  } catch (error) {    
    res.status(400).json(error)
  }
}

// Read
const getSingleBlog = async(req, res) => {
  try {
    const { id } = req.params
    const blogData = await Blog.findById(id)
    res.status(200).json(blogData)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getBlogs = async(req, res) => {
  try {
    const blogsData = await Blog.find().sort({createdAt: desc}).limit(20)
    
    res.status(200).json(blogsData)
  } catch (error) {
    res.status(400).json(error)
  }
}


module.exports = { uploadBlog, getSingleBlog, getBlogs }