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
      const blogData = await res.json()
      navigate(`blog/${id}`, { state: blogData });
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="mx-2 max-w-2xl my-10 text-left">
      <p
        className="mx-2 font-Roboto text-zinc-600 text-sm cursor-pointer"
        onClick={handleAuthorClick}>
        {author}
      </p>
      <div className="cursor-pointer" onClick={handleShowBlog}>
        <p className="mx-2 mb-2 font-popins text-xl font-semibold">{title}</p>
        <p className="mx-2 font-Roboto text-zinc-600 leading-tight line-clamp-2">
          {summary}
        </p>
      </div>
      <p className="mx-2 mt-2 font-Roboto text-zinc-500 text-xs">
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
