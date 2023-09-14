const User = require("../models/User");
const Blog = require("../models/Blog");

const author = async (req, res) => {
  try {
    const { id } = req.params; // author id
    const authorData = await User.findById(id);
    if (!authorData) {
      res.status(400).json({ Error: "author not found." });
    } else {
      delete authorData.password;
      res.status(200).json(authorData);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const { id } = req.params; // blog id
    const blog = await Blog.findById(id);
    
    const removeBookmark = async(bookmarkId, idx, arr) => {
      if (arr[idx] == bookmarkId) {
        arr.splice(idx, 1);
        return true;
      } else {
        return false;
      }
    };

    if (!blog) {
      User.bookmarks.filter(removeBookmark);
      res.status(400).json({ Error: "blog not found." });
    } else {
      const user = await User.findById(req.user.id); // req.user data came via token
      isBookmarked = user.bookmarks.includes((bookmarkId) => bookmarkId == id);
      if (isBookmarked) {
        user.bookmarks.filter(removeBookmark);
      } else {
        user.bookmarks.push(id);
      }
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

module.exports = { author, toggleBookmark };
