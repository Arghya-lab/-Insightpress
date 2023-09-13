// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import UserActionsOverlay from "./UserActionsOverlay";
import { toggleSlide } from "../features/info/infoSlice";

function Navbar() {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  const isSlideOpen = useSelector((state) => state.info.isSlideOpen);
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;

  const handleSliderState = () => {
    console.log("clicked");
    dispatch(toggleSlide());
  };

  useEffect(() => {
    if (token) {
      const fetchAuthor = async () => {
        try {
          const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
          const authorApi = `${apiBaseUrl}/api/author/${id}`;
          const res = await fetch(authorApi);
          const authorData = await res.json();
          setUserData(authorData);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAuthor();
    }
  }, []);

  return (
    <>
      <div className="px-[calc((100vw-1280px)/2)] border-b-2 flexCenter ">
        <h1 className="text-zinc-900 font-KenyanCoffee text-4xl m-4">
          Insight Social
        </h1>
        <div className="mx-4 flexCenter space-x-3">
          <img
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            src={
              token
                ? `${serverBaseUrl}/assets/avatar/${userData?.avatarImgName}`
                : "/public/assets/profileIconDefault.png"
            }
            alt="Avatar"
            onClick={handleSliderState}
          />
        </div>
      </div>
      <UserActionsOverlay
        isSlideOpen={isSlideOpen}
        handleSliderState={handleSliderState}
        userData={userData}
      />
    </>
  );
}

export default Navbar;
