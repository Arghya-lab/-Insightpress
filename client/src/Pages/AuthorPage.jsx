import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PostWidget from "../Components/PostWidget";
import AuthorInfoWidget from "../Components/AuthorInfoWidget";
import { useSelector } from "react-redux";
import EditBioModal from "../Components/EditBioModal";

function AuthorPage() {
  const [blogs, setBlogs] = useState([]);
  // blogs contains array of => _id, {authorData: { authorId, author, avatarImgName }, title, summary,  content, featuredImgName,  createdAt, updatedAt, __v}
  const [fullAuthorData, setFullAuthorData] = useState({});
  //  fullAuthorData contains =>  _id, name, email, avatarImgName, bio, bookmarks, createdAt, updatedAt, __v
  const { id } = useParams();

  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const authorBlogsApi = `${apiBaseUrl}/api/blog/author/${id}`;
  const authorDataApi = `${apiBaseUrl}/api/author/${id}`;

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const res = await fetch(authorDataApi);
        const data = await res.json();
        setFullAuthorData(data);
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
  }, [id, fullAuthorData]);

  return (
    <div>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)] flex flex-col-reverse md:flex-row items-center md:items-start justify-between">
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
                isOwnAuthorPage={blog.authorData.authorId === userId}
              />
            ))}
        </div>
        <AuthorInfoWidget authorData={fullAuthorData} />
        {token ? <EditBioModal authorData={fullAuthorData} /> : undefined}
      </div>
    </div>
  );
}

AuthorPage.defaultProp = {
  isOwnPage: false,
};
AuthorPage.propTypes = {
  isOwnPage: PropTypes.bool,
};

export default AuthorPage;
