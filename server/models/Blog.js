const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  author: {
    type: String,
    min: 6,
    max: 20,
    required: true,
  },
  title: {
    type: String,
    min: 20,
    max: 60,
    required: true,
  },
  summary: {
    type: String,
    min: 40,
    max: 80,
    required: true,
  },
  content: {
    type: String,
    min: 100,
    max: 1000,
    required: true,
  },
},{timestamps: true});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
