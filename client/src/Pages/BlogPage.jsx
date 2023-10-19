import { useLocation, useNavigate } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import useToggleBookmark from "../hooks/useToggleBookmark";
import useDeleteBlog from "../hooks/useDeleteBlog";
import useEditBlog from "../hooks/useEditBlog";
import { PiBookmarkSimpleLight, PiBookmarkSimpleFill } from "react-icons/pi";
import Navbar from "../Components/Navbar";
import { closeSlide } from "../features/info/infoSlice";
import { MdEditNote, MdDeleteForever } from "react-icons/md";
import "@fontsource/nunito/400.css";

function BlogPage() {
  const loginUserId = useSelector((state) => state.auth.id);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [isBookmarked, doToggle] = useToggleBookmark(id);
  const deleteBlog = useDeleteBlog(id);
  const editBlog = useEditBlog({ id, title, summary, content });

  const originalDateString = createdAt;
  const parsedDate = parseISO(originalDateString);
  const timePassed = formatDistanceToNow(parsedDate, {
    includeSeconds: true,
  });

  const handleAuthorClick = () => {
    dispatch(closeSlide());
    navigate(`/author/${authorId}`);
  };

  return (
    <>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)] my-8 mx-4 text-left">
        <div className="text-2xl flex items-center justify-end">
          <div className="p-2 space-x-2 text-lg pb-1 pl-1 rounded-md border border-zinc-800 dark:border-stone-200">
            {isOwnBlog ? (
              <>
                <button
                  className="text-orange-500 hover:text-orange-400"
                  onClick={() => editBlog()}>
                  <MdEditNote />
                </button>
                <button
                  className="text-rose-600 hover:text-rose-500"
                  onClick={() => deleteBlog()}>
                  <MdDeleteForever />
                </button>
              </>
            ) : undefined}
            <button className="dark:text-stone-50 hover:text-zinc-800 hover:dark:text-stone-200" onClick={() => doToggle()}>
              {isBookmarked ? (
                <PiBookmarkSimpleFill />
              ) : (
                <PiBookmarkSimpleLight />
              )}
            </button>
          </div>
        </div>
        <h1 className="font-poppins text-4xl font-bold text-zinc-900 dark:text-stone-100">
          {title}
        </h1>
        <div
          className="my-2 text-zinc-950 dark:text-stone-200 text-xl"
          style={{ fontFamily: "Nunito" }}>
          {summary}
        </div>
        <div className="my-10">
          <div
            className="my-3 flex items-center space-x-2 cursor-pointer"
            onClick={handleAuthorClick}>
            <img
              src={`${serverBaseUrl}/assets/avatar/${avatarImgName}`}
              className="w-10 rounded-full aspect-square"
              alt="Avatar"
            />
            <p className="font-Roboto text-zinc-700 dark:text-stone-300 text-lg">{author}</p>
          </div>
          {/* If edited show edited date also */}
          <p className="font-Roboto text-zinc-500 dark:text-stone-500 text-sm">publish {timePassed} ago</p>
        </div>
        {featuredImgName && (
          <img
            src={`${serverBaseUrl}/assets/featured/${featuredImgName}`}
            className="block mx-auto my-8 w-full max-w-4xl object-cover"
            alt="featured image"
          />
        )}
        <article
        className="prose dark:prose-invert lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
}

export default BlogPage;
