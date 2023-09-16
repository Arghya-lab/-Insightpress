import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeSlide } from "../features/info/infoSlice";

const useEditBlog = ({ id, title, summary, content }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editBlog = () => {
    dispatch(closeSlide());
    navigate("/create", {
      state: {
        isEditPurpose: true,
        blogId: id,
        title,
        summary,
        content,
      },
    });
  };

  return editBlog;
};

export default useEditBlog;
