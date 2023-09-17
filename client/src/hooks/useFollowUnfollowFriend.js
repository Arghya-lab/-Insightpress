import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFollowing } from "../features/auth/authSlice";

const useFollowUnfollowFriend = (id) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const following = useSelector((state) => state.auth.following);

  const [isFollowing, setIsFollowing] = useState(false);

  const followUnfollowFriend = async () => {
    const res = await fetch(`${apiBaseUrl}/api/author/following/${id}`, {
      method: "PATCH",
      headers: { "auth-token": token },
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(setFollowing(data));
      console.log(data);
    } else {
      console.log("Error occurred");
    }
  };
  useEffect(() => {
    if (following) {
      for (const follow of following) {
        if (follow == id) {
          setIsFollowing(true);
          return;
        }
      }
    }
    setIsFollowing(false);
  }, [following, id]);
  return [isFollowing, followUnfollowFriend];
};

export default useFollowUnfollowFriend;
