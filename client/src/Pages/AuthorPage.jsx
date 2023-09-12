import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PostWidget from "../Components/PostWidget";

function AuthorPage() {
  // blogs contains array of => {authorData: { authorId, author, avatarImgName }, content ,createdAt ,featuredImgName ,summary ,title ,updatedAt ,__v, _id}
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const authorBlogsApi = `${apiBaseUrl}/api/blog/author/${id}`;

  const fetchAllBlogs = async () => {
    try {
      const res = await fetch(authorBlogsApi);
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
        {/* add author dp, name, followers, about, follow/unflow button */}
      </div>
    </div>
  );
}

export default AuthorPage;
