import Navbar from "../Components/Navbar";
import FeedContainer from "../Components/FeedContainer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function FeedForMePage() {
  const [blogs, setBlogs] = useState([]);
  //  blogs includes =>  _id, authorData: { authorId, author, avatarImgName }, title, summary, content, createdAt, editedAt,  __v

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = useSelector((state) => state.auth.token);

  const fetchAllBlogs = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/author/following/feed`, {
        method: "POST",
        headers: { "auth-token": token },
      });
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <>
        <Navbar />
        <div className="px-[calc((100vw-1280px)/2)]">
          <FeedContainer blogs={blogs} />
        </div>
      </>
    </div>
  );
}

export default FeedForMePage;
