import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeSlide } from "../features/info/infoSlice";
import "@fontsource/nunito/600.css";
import { PiBookmarkSimpleLight, PiBookmarkSimpleFill } from "react-icons/pi";
import { setBookmarks } from "../features/auth/authSlice";

function PostWidget({
  id,
  authorData,
  title,
  summary,
  featuredImgName,
  content,
  createdAt,
  }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const bookmarks = useSelector((state)=>state.auth.bookmarks)
  const token = useSelector((state) => state.auth.token);
  const [isBookmarked, setIsBookmarked] = useState(false)

  const { authorId, author, avatarImgName } = authorData;
  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const originalDateString = createdAt;
  const parsedDate = parseISO(originalDateString);
  const timePassed = formatDistanceToNow(parsedDate, {
    includeSeconds: true,
  });

  const handleAuthorClick = () => {
    dispatch(closeSlide())
    navigate(`/author/${authorId}`);
  };

  const handleBookmark = async() => {
    //  /api/author/bookmark/:id
    const res = await fetch(
      `${apiBaseUrl}/api/author/bookmark/${id}`,
      {
        method: "PUT",
        headers: { "auth-token": token },
      }
    );
    if (res.ok) {
      const data = await res.json()
      dispatch(setBookmarks(data));
      console.log(data);
    } else {
      console.log("Error occurred");
    }
  }
  
  const handleShowBlog = async () => {
    try {
      dispatch(closeSlide())
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

  useEffect(() => {
    console.log(bookmarks);
    if (bookmarks) {
      for (const bookmark of bookmarks) {
        if (bookmark == id) {
          setIsBookmarked(true)
          return
        }
      }
    }
  }, [bookmarks])
  

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
        <div className="cursor-pointer hover:text-zinc-800" onClick={handleBookmark}>
          {isBookmarked?<PiBookmarkSimpleFill />:<PiBookmarkSimpleLight />}
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
};

export default PostWidget;
