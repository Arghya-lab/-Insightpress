import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeSlide } from "../features/info/infoSlice";

const useDeleteBlog = (id) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteBlog = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/blog/${id}`, {
        method: "DELETE",
        headers: { "auth-token": token },
      });
      if (res.ok) {
        console.log("Blog deleted successful");
        dispatch(closeSlide());
        navigate("/");
      } else {
        console.log("wrong credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return deleteBlog;
};

export default useDeleteBlog;
