import PropTypes from "prop-types";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

function PostWidget({ id, authorData, title, summary, content, createdAt }) {
  const navigate = useNavigate();
  const { authorId, author, avatarImgName } = authorData;
  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;

  const originalDateString = createdAt;
  const parsedDate = parseISO(originalDateString);
  const timePassed = formatDistanceToNow(parsedDate, {
    includeSeconds: true,
  });

  const handleAuthorClick = () => {
    navigate(`author/${authorId}`);
  };

  const handleShowBlog = async () => {
    try {
      navigate(`blog/${id}`, { state: { id, authorData, title, summary, content, createdAt } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-4 max-w-3xl my-10 text-left">
      <div className="mx-1 flex items-center space-x-2 cursor-pointer" onClick={handleAuthorClick}>
        <div>
          <img
            src={`${serverBaseUrl}/assets/avatar/${avatarImgName}`}
            className="w-7 rounded-full"
            alt="Avatar"
          />
        </div>
        <p
          className="font-Roboto text-zinc-600 text-sm"
          >
          {author}
        </p>
      </div>
      <div className="cursor-pointer" onClick={handleShowBlog}>
        <p className="mb-2 font-popins text-xl font-semibold">{title}</p>
        <p className="font-Roboto text-zinc-600 leading-tight line-clamp-2">
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
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default PostWidget;
