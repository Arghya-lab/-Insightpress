import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PostWidget from "../Components/PostWidget";

function AuthorPage() {
  const [blogs, setBlogs] = useState(null);
  const { id } = useParams();

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const allBlogsApi = `${apiBaseUrl}/api/blog/author/${id}`;

  const fetchAllBlogs = async () => {
    try {
      const res = await fetch(allBlogsApi);
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
      <Navbar />
      <div>
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
          ))}
        {/* add author dp, name, followers, about, follow/unflow button */}
      </div>
    </div>
  );
}

export default AuthorPage;
