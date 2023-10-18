import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import AuthorInfoWidget from "../Components/AuthorInfoWidget";
import { useSelector } from "react-redux";
import EditBioModal from "../Components/EditBioModal";
import FeedContainer from "../Components/FeedContainer";

function AuthorPage() {
  const [blogs, setBlogs] = useState([]);
  // blogs contains array of => _id, {authorData: { authorId, author, avatarImgName }, title, summary,  content, featuredImgName,  createdAt, updatedAt, __v}
  const [fullAuthorData, setFullAuthorData] = useState({});
  //  fullAuthorData contains =>  _id, name, email, avatarImgName, bio, bookmarks, createdAt, updatedAt, __v
  const [isOwnPage, setIsOwnPage] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { id } = useParams();
  // const location = useLocation();
  // const  id = location.state
  const authorId = useSelector((state) => state.auth.id);
console.log(id);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const authorBlogsApi = `${apiBaseUrl}/api/blog/author/${id}?page=${pageIdx}`;
  const authorDataApi = `${apiBaseUrl}/api/author/${id}`;

  const fetchAuthorData = async () => {
    try {
      const res = await fetch(authorDataApi);
      const data = await res.json();
      console.log("authorData", data);
      setFullAuthorData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      if (hasMore) {
        console.log("authorBlogsApi", authorBlogsApi);
        const res = await fetch(authorBlogsApi);
        const { data, totalBlogs } = await res.json();
        console.log("blogData", data, totalBlogs);
        setBlogs(blogs.concat(data));
        setPageIdx(pageIdx + 1);
        if (blogs.length === totalBlogs) {
          setHasMore(false);
        }
        console.log(pageIdx);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setBlogs([]); // Reset blogs to empty array
    setPageIdx(0); // Reset page index to 0
    setHasMore(true); // Reset hasMore to true
    console.log("pramId", id);

    fetchAuthorData();
    fetchAllBlogs();

  }, [id,]);

  useEffect(() => {
    if (fullAuthorData._id == authorId) {
      setIsOwnPage(true);
    }
  }, [])
  

  return (
    <div>
      <Navbar />
      {/* {console.log("hi", blogs)} */}
      <div className="px-[calc((100vw-1280px)/2)] flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between">
        <FeedContainer
          blogs={blogs}
          isOwnPage={isOwnPage}
          fetchMoreData={() => fetchAllBlogs()}
          hasMore={hasMore}
        />
        {isOwnPage ? <EditBioModal authorData={fullAuthorData} /> : undefined}
        <AuthorInfoWidget authorData={fullAuthorData} />
      </div>
    </div>
  );
}

export default AuthorPage;
