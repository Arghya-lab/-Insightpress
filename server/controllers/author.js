const User = require("../models/User");
const Blog = require("../models/Blog");

/* READ AUTHOR DATA */
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

/* UPDATE USER BIO */
const editBio = async (req, res) => {
  try {
    const { id } = req.user; // req.user data came via token
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({ Error: "User not found." });
      return;
    }
    const { bio } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { bio });
    delete updatedUser.password;
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

/* READ, UPDATE BOOKMARK */
const addRemoveBookmark = async (req, res) => {
  try {
    const { id } = req.params; // blog id
    const { bookmarks } = await User.findById(req.user.id); // req.user data came via token

    let newBookmarks = [];
    if (bookmarks.includes(id)) {
      //  if blog id present
      newBookmarks = bookmarks.filter((bookmarkId) => bookmarkId !== id);
    } else {
      //  if blog id not present
      newBookmarks = [...bookmarks, id];
    }
    await User.findByIdAndUpdate(req.user.id, { bookmarks: newBookmarks });
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
      //  optimize this
      let bookmarkBlogData = [];
      for (const bookmark of bookmarks) {
        bookmarkBlogData.push(await Blog.findById(bookmark));
      }
      res.status(200).json(bookmarkBlogData);
    } else {
      res.status(400).json("no bookmark found");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

/* UPDATE FOLLOWER & READ FOLLOWER POST */
const addRemoveAuthor = async (req, res) => {
  try {
    const { id } = req.params; // author id
    const { following } = await User.findById(req.user.id); // req.user data came via token

    let newFollowing = [];
    if (following.includes(id)) {
      //  if author id present
      newFollowing = following.filter((followingId) => followingId !== id);
    } else {
      //  if author id not present
      newFollowing = [...following, id];
    }
    await User.findByIdAndUpdate(req.user.id, { following: newFollowing });

    const updatedUser = await User.findById(req.user.id);
    res.status(200).json(updatedUser.following);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getFollowingFeed = async (req, res) => {
  try {
    const { following } = await User.findById(req.user.id); // req.user data came via token
    const followingAuthorBlogs = await
    Blog.find({ "authorData.authorId": { $in: following } }) // finding blogs that are contains authorId any one of following users
    .sort({ createdAt: "desc" })  // Sort by createdAt in descending order
    .limit(7)
    
    res.status(200).json(followingAuthorBlogs);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = {
  author,
  editBio,
  addRemoveBookmark,
  getBookmark,
  addRemoveAuthor,
  getFollowingFeed,
};
