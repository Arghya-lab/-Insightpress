import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import UserActionsOverlay from "./UserActionsOverlay";
import { openSlide } from "../features/info/infoSlice";

function Navbar() {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  const isSlideOpen = useSelector((state) => state.info.isSlideOpen);
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;

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
      <div className="w-full top-0 fixed">
        <div className="px-[calc((100vw-1280px)/2)] border-b-2 dark:border-stone-700 flexCenter dark:bg-stone-950">
          <h1 className="text-zinc-900 dark:text-stone-50 font-KenyanCoffee text-4xl m-4">
            Insight Social
          </h1>
          <div
            className="mx-4 flexCenter space-x-3"
            onClick={() => dispatch(openSlide())}>
            <img
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              src={
                token
                  ? `${serverBaseUrl}/assets/avatar/${userData?.avatarImgName}`
                  : "/assets/profileIconDefault.png"
              }
              alt="Avatar"
            />
          </div>
        </div>
        <UserActionsOverlay
          key={isSlideOpen ? "open" : "close"}
          userData={userData}
        />
      </div>
      <div className="pt-24"></div>
    </>
  );
}

export default Navbar;
