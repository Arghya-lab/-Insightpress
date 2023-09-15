import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import PostWidget from "../Components/PostWidget";

function Home({ isBookmarkPage }) {
  const [blogs, setBlogs] = useState([]);
  //  blogs includes =>  _id, authorData: { authorId, author, avatarImgName }, title, summary, content, createdAt, editedAt,  __v

  const token = useSelector((state) => state.auth.token);
  const bookmarks = useSelector((state) => state.auth.bookmarks);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchAllBlogs = async () => {
    try {
      if (!isBookmarkPage) {
        const res = await fetch(`${apiBaseUrl}/api/blog`);
        const data = await res.json();
        setBlogs(data);
      } else {
        // if bookmarkPage
        const res = await fetch(`${apiBaseUrl}/api/author/bookmark`, {
          method: "POST",
          headers: { "auth-token": token },
        });
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBookmarkPage, bookmarks]);

  return (
    <>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)]">
        {blogs &&
          blogs.map((blog) => (
            <PostWidget
              key={blog._id}
              id={blog._id}
              authorData={blog.authorData}
              title={blog.title}
              summary={blog.summary}
              featuredImgName={blog.featuredImgName}
              content={blog.content}
              createdAt={blog.createdAt}
            />
          ))}
      </div>
    </>
  );
}

Home.defaultProps = {
  isBookmarkPage: false,
};
Home.propTypes = {
  isBookmarkPage: PropTypes.bool,
};

export default Home;
