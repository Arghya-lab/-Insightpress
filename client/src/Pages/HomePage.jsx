import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import FeedContainer from "../Components/FeedContainer";

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  //  blogs includes =>  _id, authorData: { authorId, author, avatarImgName }, title, summary, content, createdAt, editedAt,  __v

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchAllBlogs = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/blog`);
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
    <>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)]">
        <FeedContainer blogs={blogs} />
      </div>
    </>
  );
}

export default HomePage;
