import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PostWidget from "../Components/PostWidget";

function AuthorPage() {
  // blogs contains array of => {authorData: { authorId, author, avatarImgName }, content ,createdAt ,featuredImgName ,summary ,title ,updatedAt ,__v, _id}
  const [blogs, setBlogs] = useState([]);
  const [authorData, setAuthorData] = useState(null);
  const { id } = useParams();

  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const authorBlogsApi = `${apiBaseUrl}/api/blog/author/${id}`;
  const authorDataApi = `${apiBaseUrl}/api/author/${id}`;

  const fetchAuthorData = async () => {
    try {
      const res = await fetch(authorDataApi);
      const data = await res.json();
      setAuthorData(data);
    } catch (error) {
      console.log(error);
    }
  };

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
    fetchAuthorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)] flex">
        <div>
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
        <div className="w-[425px] m-4 p-4 border-[2px] rounded-lg shadow-md">
          <img
            className="block m-auto w-36 object-cover aspect-square rounded-full"
            src={`${serverBaseUrl}/assets/avatar/${authorData?.avatarImgName}`}
          />
          <p className="my-6 font-popins text-lg font-semibold text-purple-950">{authorData?.name}</p>
          {/* <p className="font-Roboto text-zinc-700">{authorData?.about}</p> */}
        {/* add author followers, follow/unflow button */}
        </div>
      </div>
    </div>
  );
}

export default AuthorPage;
