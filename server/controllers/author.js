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

const addRemoveBookmark = async (req, res) => {
  try {
    const { id } = req.params; // blog id
    const { bookmarks } = await User.findById(req.user.id); // req.user data came via token

    let newBookmark = []
    if (bookmarks.includes(id)) {
      //  if blog id present
      newBookmark = bookmarks.filter(bookmarkId => bookmarkId !== id)
    } else {
      //  if blog id not present
      newBookmark = [...bookmarks, id]
    }
    await User.findByIdAndUpdate(req.user.id, { bookmarks: newBookmark})
    const updatedUser = await User.findById(req.user.id);
    res.status(200).json(updatedUser.bookmarks);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getBookmark = async (req, res) => {
  try {
    const { id } = req.user; // data came via token
    const { bookmarks } = await User.findById(id);
    if (bookmarks) {
    let bookmarkBlogData = []
    for (const bookmark of bookmarks) {
      bookmarkBlogData.push(await Blog.findById(bookmark))
    }
    res.status(200).send(bookmarkBlogData)
  } else {
    res.status(400).json("no bookmark found")
  }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { author, addRemoveBookmark, getBookmark };
