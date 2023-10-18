import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import FeedContainer from "../Components/FeedContainer";
import { useSelector } from "react-redux";

function BookmarkPage() {
  const [blogs, setBlogs] = useState([]);
  //  blogs includes =>  _id, authorData: { authorId, author, avatarImgName }, title, summary, content, createdAt, editedAt,  __v
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = useSelector((state) => state.auth.token);

  const fetchBlogs = async () => {
    try {
      if (hasMore) {
        const res = await fetch(
          `${apiBaseUrl}/api/author/bookmark?pageNo=${pageNo}`,
          {
            method: "POST",
            headers: { "auth-token": token },
          }
        );
        const { data, totalBlogs } = await res.json();
        console.log(data, totalBlogs);
        setBlogs(blogs.concat(data));
        setPageNo(pageNo + 1);
        if (blogs.length === totalBlogs) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)] flex flex-col items-center">
        <FeedContainer
          blogs={blogs}
          fetchMoreData={() => fetchBlogs()}
          hasMore={hasMore}
        />
      </div>
    </>
  );
}

export default BookmarkPage;
