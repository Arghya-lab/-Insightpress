import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookmarks } from "../features/auth/authSlice";

const useToggleBookmark = (id) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const bookmarks = useSelector((state) => state.auth.bookmarks);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const doToggle = async () => {
    const res = await fetch(`${apiBaseUrl}/api/author/bookmark/${id}`, {
      method: "PATCH",
      headers: { "auth-token": token },
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(setBookmarks(data));
      console.log(data);
    } else {
      console.log("Error occurred");
    }
  };
  useEffect(() => {
    if (bookmarks) {
      for (const bookmark of bookmarks) {
        if (bookmark == id) {
          setIsBookmarked(true);
          return;
        }
      }
    }
    setIsBookmarked(false);
  }, [bookmarks, id]);
  return [isBookmarked, doToggle];
};

export default useToggleBookmark;
