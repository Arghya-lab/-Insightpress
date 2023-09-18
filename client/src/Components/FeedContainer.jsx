import PropType from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import PostWidget from "./PostWidget";

function FeedContainer({ blogs, isOwnPage, fetchMoreData, hasMore }) {
  return (
    <InfiniteScroll
      dataLength={blogs.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
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
