import { useEffect, useState } from "react";
import PropTypes from "prop-types"
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PostWidget from "../Components/PostWidget";
import AuthorInfoWidget from "../Components/AuthorInfoWidget";

function AuthorPage({ isOwnPage }) {
  // blogs contains array of => _id, {authorData: { authorId, author, avatarImgName }, title, summary,  content, featuredImgName,  createdAt, updatedAt, __v}
  const [blogs, setBlogs] = useState([]);
  const [authorData, setAuthorData] = useState(null);
  const { id } = useParams();

  // const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const authorBlogsApi = `${apiBaseUrl}/api/blog/author/${id}`;
  const authorDataApi = `${apiBaseUrl}/api/author/${id}`;

  useEffect(() => {
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

    fetchAllBlogs();
    fetchAuthorData();
  }, [authorDataApi, authorBlogsApi]);

  return (
    <div>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)] flex justify-between">
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
                isOwnAuthorPage={isOwnPage}
              />
            ))}
        </div>
        <AuthorInfoWidget authorData={authorData} />
        {/* <div className="w-[425px] m-4 p-4 border-[2px] rounded-lg shadow-md">
          <img
            className="block m-auto w-36 object-cover aspect-square rounded-full"
            src={`${serverBaseUrl}/assets/avatar/${authorData?.avatarImgName}`}
          />
          <p className="my-6 font-poppins text-lg font-semibold text-purple-950">
            {authorData?.name}
          </p>
          <p className="font-Roboto mx-10 text-zinc-700">{authorData?.bio}</p>
          add author followers, follow/unfollow button
        </div> */}
      </div>
    </div>
  );
}

AuthorPage.defaultProp = {
  isOwnPage: false
}
AuthorPage.propTypes = {
  isOwnPage: PropTypes.bool
}

export default AuthorPage;
