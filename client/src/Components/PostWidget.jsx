import PropTypes from "prop-types";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

function PostWidget({ id, author, title, summary, createdAt }) {
  const navigate = useNavigate();

  const originalDateString = createdAt;
  const parsedDate = parseISO(originalDateString);
  const timePassed = formatDistanceToNow(parsedDate, {
    includeSeconds: true,
  });

  const handleAuthorClick = () => {
    navigate(`author/${id}`);
  };

  const handleShowBlog = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const blogApi = `${apiBaseUrl}/api/blog/${id}`;

      const res = await fetch(blogApi);
      const blogData = await res.json();
      navigate(`blog/${id}`, { state: { ...blogData, id } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-4 max-w-3xl my-10 text-left">
      <div className="mx-1 flex items-center space-x-2">
        <div>
          <img
            src="https://tecdn.b-cdn.net/img/new/avatars/5.webp"
            className="w-7 rounded-full"
            alt="Avatar"
          />
        </div>
        <p
          className="font-Roboto text-zinc-600 text-sm cursor-pointer"
          onClick={handleAuthorClick}>
          {author}
        </p>
      </div>
      <div className="cursor-pointer" onClick={handleShowBlog}>
        <p className="mb-2 font-popins text-xl font-semibold">{title}</p>
        <p className="font-Roboto text-zinc-600 leading-tight line-clamp-2">
          {summary}
        </p>
      </div>
      <p className="mt-2 font-Roboto text-zinc-500 text-xs">
        {timePassed}
      </p>
    </div>
  );
}

PostWidget.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default PostWidget;
