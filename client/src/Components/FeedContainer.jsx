import PropType from "prop-types";
import PostWidget from "./PostWidget";

function FeedContainer({ blogs, isOwnPage }) {
  return (
    <>
      {blogs.map((blog) => (
        <PostWidget
          key={blog._id}
          id={blog._id}
          authorData={blog.authorData}
          title={blog.title}
          summary={blog.summary}
          featuredImgName={blog.featuredImgName}
          content={blog.content}
          createdAt={blog.createdAt}
          isOwnPage={isOwnPage}
        />
      ))}
    </>
  );
}

FeedContainer.propTypes = {
  blogs: PropType.array.isRequired,
  isOwnPage: PropType.bool.isRequired,
};

export default FeedContainer;
