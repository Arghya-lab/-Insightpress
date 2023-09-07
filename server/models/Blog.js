const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  userId: {
    type: String,
    // type: 'UUID',
    // ref: 'User' ,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    min: 20,
    max: 70,
    required: true,
  },
  summary: {
    type: String,
    min: 60,
    max: 100,
    required: true,
  },
  content: {
    type: String,
    min: 1000,
    max: 10000,
    required: true,
  },
},{timestamps: true});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
