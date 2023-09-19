import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import FeedContainer from "../Components/FeedContainer";
import { useSelector } from "react-redux";

function BookmarkPage() {
  const [blogs, setBlogs] = useState([]);
  //  blogs includes =>  _id, authorData: { authorId, author, avatarImgName }, title, summary, content, createdAt, editedAt,  __v
  const [pageIdx, setPageIdx] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = useSelector((state) => state.auth.token);

  const fetchAllBlogs = async () => {
    try {
      if (hasMore) {
        const res = await fetch(
          `${apiBaseUrl}/api/author/bookmark?page=${pageIdx}`,
          {
            method: "POST",
            headers: { "auth-token": token },
          }
        );
        const { data, totalBlogs } = await res.json();
        console.log(data, totalBlogs);
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
      <div className="px-[calc((100vw-1280px)/2)] flex flex-col items-center">
        <FeedContainer
          blogs={blogs}
          fetchMoreData={() => fetchAllBlogs()}
          hasMore={hasMore}
        />
      </div>
    </>
  );
}

export default BookmarkPage;