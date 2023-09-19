import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../features/auth/authSlice";
import { closeSlide, setMode } from "../features/info/infoSlice";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import { MdOutlineHome } from "react-icons/md";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { useEffect, useRef } from "react";

function UserActionsOverlay({ userData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modeRef = useRef();

  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const isSlideOpen = useSelector((state) => state.info.isSlideOpen);
  const mode = useSelector((state) => state.info.mode);

  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;

  const handleLoginLogout = () => {
    dispatch(closeSlide());
    if (token) {
      dispatch(setLogout());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleModeChange = () => {
    dispatch(setMode(modeRef.current.value));
  };

  useEffect(() => {
    if (mode === 'dark' || (mode=== 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode]);

  return (
    <aside
      className={`flex flex-col justify-between fixed top-0 z-50 right-[-100vw] sm:right-[-364px] w-[100vw] sm:w-[364px] h-full p-8 bg-zinc-100 dark:bg-stone-900 ${
        isSlideOpen ? "shadow-zinc-950 dark:shadow-black shadow-xl" : "shadow-none"
      }  transition-transform transform  ${
        isSlideOpen ? "-translate-x-full" : "translate-x-0"
      }`}>
      <div className="flex flex-col items-stretch space-y-2 font-semibold font-Roboto text-xl text-zinc-700 dark:text-stone-300">
        <div className="my-6 flex justify-between">
          <div className="flex justify-between items-center space-x-2">
            {token ? (
              <>
                <img
                  className="w-12 aspect-square rounded-full object-cover"
                  src={`${serverBaseUrl}/assets/avatar/${userData?.avatarImgName}`}
                  alt="Avatar"
                />
                <p className="text-base">{userData?.name}</p>
              </>
            ) : undefined}
          </div>
          <button
            className="px-4 h-12 rounded-md hover:bg-zinc-300 hover:dark:bg-stone-700"
            onClick={() => dispatch(closeSlide())}>
            <RxCross2 />
          </button>
        </div>
        <div
          className="actionOverlayBtnContainer"
          onClick={() => {
            dispatch(closeSlide());
            navigate("/");
          }}>
          <p>Home</p>
          <MdOutlineHome />
        </div>
        {token ? (
          <>
            <div
              className="actionOverlayBtnContainer"
              onClick={() => {
                dispatch(closeSlide());
                navigate(`/feedForMe`);
              }}>
              <p>For You</p>
              <LiaUserFriendsSolid />
            </div>
            <div
              className="actionOverlayBtnContainer"
              onClick={() => {
                dispatch(closeSlide());
                navigate(`/author/${id}`);
              }}>
              <p>Profile</p>
              <CgProfile />
            </div>
            <div
              className="actionOverlayBtnContainer"
              onClick={() => {
                dispatch(closeSlide());
                navigate("/bookmarks");
              }}>
              <p>BookMarks</p>
              <PiBookmarkSimpleLight />
            </div>
          </>
        ) : undefined}
        <div className="flex justify-between items-center h-12 p-2">
          <label className="text-xl text-zinc-800 dark:text-stone-200 font-poppins">
            Mode
          </label>
          <select
            ref={modeRef}
            defaultValue={mode}
            className="font-Roboto font-normal text-base p-3 cursor-pointer hover:bg-zinc-100 hover:dark:bg-stone-950 dark:bg-stone-900 rounded-md"
            onChange={handleModeChange}>
            <option
              className="dark:text-stone-50 dark:bg-stone-600 checked:dark:bg-stone-950"
              value="light">
              Light
            </option>
            <option
              className="dark:text-stone-50 dark:bg-stone-600 checked:dark:bg-stone-950"
              value="dark">
              Dark
            </option>
            <option
              className="dark:text-stone-50 dark:bg-stone-600 checked:dark:bg-stone-950"
              value="auto">
              Auto
            </option>
          </select>
        </div>
        <div className="mt-8 flex flex-col space-y-4">
          {token ? (
            <button
              type="button"
              className="btn h-12 w-1/2 max-w-[252px] mx-auto bg-zinc-900 dark:bg-stone-100 text-white dark:text-stone-950 hover:bg-zinc-800 hover:dark:bg-stone-200 flexCenter"
              onClick={() => {
                dispatch(closeSlide());
                navigate("/create");
              }}>
              Write
              <HiOutlinePencilAlt />
            </button>
          ) : undefined}
        </div>
      </div>
      <div className="space-y-2">
        <button
          type="button"
          className="btn h-10 w-2/3 max-w-[252px] mx-auto bg-zinc-200 dark:bg-stone-800 text-zinc-900 dark:text-stone-100 hover:bg-zinc-300 hover:dark:bg-stone-700 flex items-center justify-around"
          onClick={handleLoginLogout}>
          {token ? "Logout" : "Login"}
          {token ? <IoLogOutOutline /> : <IoLogInOutline />}
        </button>
        <div className="font-serif">
          <span className="dark:text-stone-50">
            &copy; {new Date().getFullYear()} Insightpress. Made with ♥️ By
            Arghya-lab 
          </span>
          <a className="text-zinc-700 dark:text-stone-300" href="https://github.com/Arghya-lab">
            {" "}
            Visit : <span className="text-blue-400">Github</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

UserActionsOverlay.propTypes = {
  userData: PropTypes.object,
};

export default UserActionsOverlay;
