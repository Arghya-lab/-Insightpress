import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import FeedContainer from "../Components/FeedContainer";

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  //  blogs includes =>  _id, authorData: { authorId, author, avatarImgName }, title, summary, content, createdAt, editedAt,  __v
  const [pageIdx, setPageIdx] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchAllBlogs = async () => {
    try {
      if (hasMore) {
        const res = await fetch(`${apiBaseUrl}/api/blog?page=${pageIdx}`);
        const { data, totalBlogs } = await res.json();
        setBlogs(blogs.concat(data));
        setPageIdx(pageIdx + 1);
        if (blogs.length === totalBlogs) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)]">
        <FeedContainer
          blogs={blogs}
          fetchMoreData={() => fetchAllBlogs()}
          hasMore={hasMore}
        />
      </div>
    </>
  );
}

export default HomePage;
