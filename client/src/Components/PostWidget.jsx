import PropTypes from "prop-types";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useToggleBookmark from "../hooks/useToggleBookmark";
import useDeleteBlog from "../hooks/useDeleteBlog";
import useEditBlog from "../hooks/useEditBlog";
import { closeSlide } from "../features/info/infoSlice";
import { PiBookmarkSimpleLight, PiBookmarkSimpleFill } from "react-icons/pi";
import { MdEditNote, MdDeleteForever } from "react-icons/md";
import "@fontsource/nunito/600.css";

function PostWidget({
  id,
  authorData,
  title,
  summary,
  featuredImgName,
  content,
  createdAt,
  isOwnAuthorPage,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isBookmarked, doToggle] = useToggleBookmark(id)
  const deleteBlog = useDeleteBlog(id)
  const editBlog = useEditBlog({ id, title, summary, content })

  const { authorId, author, avatarImgName } = authorData;
  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;

  const originalDateString = createdAt;
  const parsedDate = parseISO(originalDateString);
  const timePassed = formatDistanceToNow(parsedDate, {
    includeSeconds: true,
  });

  const handleAuthorClick = () => {
    dispatch(closeSlide());
    navigate(`/author/${authorId}`);
  };

  const handleShowBlog = async () => {
    try {
      dispatch(closeSlide());
      navigate(`/blog/${id}`, {
        state: {
          id,
          authorData,
          title,
          featuredImgName,
          summary,
          content,
          createdAt,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-2 p-3 max-w-4xl my-3 text-left border-[2px] rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div
          className="mb-2 flex items-center space-x-2 cursor-pointer"
          onClick={handleAuthorClick}>
          <img
            src={`${serverBaseUrl}/assets/avatar/${avatarImgName}`}
            className="w-7 rounded-full aspect-square"
            alt="Avatar"
          />
          <p className="font-Roboto text-zinc-700 text-sm">{author}</p>
        </div>
        <div>
          {isOwnAuthorPage ? (
            <>
              <button className="text-orange-500 mx-2" onClick={()=>editBlog()}>
                <MdEditNote />
              </button>
              <button className="text-rose-600 mx-2" onClick={()=>deleteBlog()}>
                <MdDeleteForever />
              </button>
            </>
          ) : undefined}
          <button
            className="hover:text-zinc-800"
            onClick={()=>doToggle()}>
            {isBookmarked ? <PiBookmarkSimpleFill /> : <PiBookmarkSimpleLight />}
          </button>
        </div>
      </div>
      <div className="cursor-pointer" onClick={handleShowBlog}>
        <p className="mb-1 font-poppins text-xl font-semibold">{title}</p>
        <p
          className=" text-zinc-700 leading-tight line-clamp-2"
          style={{ fontFamily: "Nunito", fontWeight: 600 }}>
          {summary}
        </p>
      </div>
      <p className="mt-2 font-Roboto text-zinc-500 text-xs">{timePassed} ago</p>
    </div>
  );
}

PostWidget.propTypes = {
  id: PropTypes.string.isRequired,
  authorData: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  featuredImgName: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  isOwnAuthorPage: PropTypes.bool.isRequired,
};

export default PostWidget;
