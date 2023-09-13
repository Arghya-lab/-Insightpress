import { useLocation, useNavigate } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";
import Navbar from "../Components/Navbar";
import { MdEditNote } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import "@fontsource/nunito/400.css";

function BlogPage() {
  const loginUserId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;

  // location.state contains =>  id, authorData: {authorId, author, avatarImgName}, title, summary, createdAt
  const {
    id,
    authorData: { authorId, author, avatarImgName },
    title,
    summary,
    featuredImgName,
    content,
    createdAt,
  } = location.state;
  const isOwnBlog = authorId === loginUserId;

  const originalDateString = createdAt;
  const parsedDate = parseISO(originalDateString);
  const timePassed = formatDistanceToNow(parsedDate, {
    includeSeconds: true,
  });

  const handleAuthorClick = () => {
    navigate(`/author/${authorId}`);
  };

  const handleEdit = () => {
    navigate("/create", {
      state: {
        isEditPurpose: true,
        blogId: id,
        title,
        summary,
        content,
      },
    });
  };

  const handleDelete = async () => {
    const res = await fetch(`${apiBaseUrl}/api/blog/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "auth-token": token },
    });
    if (res.ok) {
      console.log("Blog deleted successful");
      navigate("/");
    } else {
      console.log("wrong credentials");
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)] my-8 mx-4 text-left">
        {isOwnBlog ? (
          <div className="text-2xl m-4 text-right">
            <button className="text-orange-500 mx-2" onClick={handleEdit}>
              <MdEditNote />
            </button>
            <button className="text-rose-600 mx-2" onClick={handleDelete}>
              <MdDeleteForever />
            </button>
          </div>
        ) : undefined}
        <h1 className="font-poppins text-4xl font-bold text-zinc-900">
          {title}
        </h1>
        <div className="my-12">
          <div
            className="my-3 flex items-center space-x-2 cursor-pointer"
            onClick={handleAuthorClick}>
            <img
              src={`${serverBaseUrl}/assets/avatar/${avatarImgName}`}
              className="w-10 rounded-full aspect-square"
              alt="Avatar"
            />
            <p className="font-Roboto text-zinc-700 text-lg">{author}</p>
          </div>
          <p className="font-Roboto text-zinc-500 text-sm">{timePassed} ago</p>
        </div>
        <div className="text-zinc-950 text-lg" style={{ fontFamily: "Nunito" }}>
          {summary}
        </div>
        {featuredImgName && (
          <img
            src={`${serverBaseUrl}/assets/featured/${featuredImgName}`}
            className="block mx-auto my-8 w-full max-w-4xl object-cover"
            alt="featured image"
          />
        )}
        <div
        className="no-tailwind"
          style={{ fontFamily: "Nunito", fontSize: "1.2rem" }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
}

export default BlogPage;
