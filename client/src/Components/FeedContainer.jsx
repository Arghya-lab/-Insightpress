import PropType from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import PostWidget from "./PostWidget";
import Loading from "./Loading/Loading";

function FeedContainer({ blogs, isOwnPage, fetchMoreData, hasMore }) {
  return (
    <InfiniteScroll
      dataLength={blogs.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loading className="text-center" />}
      endMessage={
        <p className="my-6 text-center font-poppins text-sky-800 dark:text-sky-200" >
          Yep! You have seen it all
        </p>
      }
      scrollableTarget="scrollableDiv">
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
    </InfiniteScroll>
  );
}

FeedContainer.defaultProps ={
  isOwnPage: false,
}

FeedContainer.propTypes = {
  blogs: PropType.array.isRequired,
  isOwnPage: PropType.bool,
  fetchMoreData: PropType.func.isRequired,
  hasMore: PropType.bool.isRequired,
};

export default FeedContainer;
