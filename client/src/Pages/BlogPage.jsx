import { useLocation, useNavigate } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";
import Navbar from "../Components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";

function BlogPage() {
  const loginUserid = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const navigate = useNavigate()

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // location.state contains =>  _id, userId, author, content, createdAt, summary, title, updatedAt, __v
  const { id, userId, author, title, summary, content, createdAt } = location.state;
  const isOwnBlog = userId === loginUserid;

  const originalDateString = createdAt;
  const parsedDate = parseISO(originalDateString);
  const timePassed = formatDistanceToNow(parsedDate, {
    includeSeconds: true,
  });

  const handleEdit = ()=> {
    navigate("/create", { state: { isEditPurpose: true, blogId: id, title, summary, content }})
  }
  
  const handleDelete = async ()=> {
    const res = await fetch(`${apiBaseUrl}/api/blog/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "auth-token": token },
    });
    if (res.ok) {
      console.log("Blog deleted sucessful");
      navigate("/");
    } else {
      console.log("wrong credentials");
    }
  }

  return (
    <>
      <Navbar />
      <div className="px-[calc((100vw-1280px)/2)] my-12 mx-4 text-left">
        {isOwnBlog ? (
          <div className="text-2xl m-4  flex flex-row-reverse">
            <button className="text-amber-500 mx-2" onClick={handleEdit}>
              <FaEdit />
            </button>
            <button className="text-rose-600 mx-2" onClick={handleDelete}>
              <MdDeleteForever />
            </button>
          </div>
        ) : undefined}
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
          className="font-Roboto text-zinc-900 tracking-normal antialiased"
          style={{ wordSpacing: "0.16em" }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
}

export default BlogPage;
