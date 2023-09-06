import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";

function BlogPage() {
  const location = useLocation();
  const { author, title, content, createdAt } = location.state;

  const originalDateString = createdAt;
  const parsedDate = parseISO(originalDateString);
  const timePassed = formatDistanceToNow(parsedDate, {
    includeSeconds: true,
  });

  return (
    <>
      <Navbar />
      <div className="px-[calc((100vw-1024px)/2)] my-16 mx-6 text-left">
        <h1 className="font-popins text-4xl font-bold text-zinc-900">
          {title}
        </h1>
        <div className=" my-12">
          <div>
            <p className="font-Roboto text-zinc-700 text-lg">{author}</p>
          </div>
          <p className="font-Roboto text-zinc-500 text-sm">{timePassed}</p>
        </div>
        <div
          className="font-Roboto text-zinc-700 text-lg font-medium tracking-wide leading-8 antialiased"
          style={{ wordSpacing: "0.15em" }}>
          {content}
        </div>
      </div>
    </>
  );
}

export default BlogPage;
