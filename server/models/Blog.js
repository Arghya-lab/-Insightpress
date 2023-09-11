const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  authorData: {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    avatarImgName: {
      type: String,
      required: true,
    },
  },
  title: {
    type: String,
    min: 15,
    max: 70,
    required: true,
  },
  summary: {
    type: String,
    min: 40,
    max: 100,
    required: true,
  },
  featuredImgName:{
    type: String,
    default: "",
  },
  content: {
    type: String,
    min: 1000,
    max: 30000,
    required: true,
  },
},{timestamps: true});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
