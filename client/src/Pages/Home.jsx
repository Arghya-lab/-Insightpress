import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import PostWidget from "../Components/PostWidget";

function Home() {
  const [blogs, setBlogs] = useState(null)

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const allBlogsApi = `${apiBaseUrl}/api/blog`;

  const fetchAllBlogs = async () => {
    try {
      const res = await fetch(allBlogsApi);
      const data = await res.json()
      setBlogs(data)
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
        {blogs &&
          blogs.map((blog) => (
            <PostWidget
              key={blog._id}
              id={blog._id}
              author={blog.author}
              title={blog.title}
              summary={blog.summary}
              createdAt={blog.createdAt}
            />
            ))
          }
      </div>
    </>
  );
}

export default Home;
