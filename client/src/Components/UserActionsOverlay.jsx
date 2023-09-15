import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../features/auth/authSlice";
import { closeSlide } from "../features/info/infoSlice";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { GrUserSettings } from "react-icons/gr";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import { MdOutlineHome, MdLightMode, MdModeNight } from "react-icons/md";
import { PiBookmarkSimpleLight } from "react-icons/pi";

function UserActionsOverlay({ userData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const isSlideOpen = useSelector((state) => state.info.isSlideOpen);

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

  return (
    <aside
      className={`flex flex-col justify-between fixed top-0 right-[-100vw] sm:right-[-364px] w-[100vw] sm:w-[364px] h-full p-8 bg-zinc-100  ${
        isSlideOpen ? "shadow-zinc-950 shadow-xl" : "shadow-none"
      }  transition-transform transform  ${
        isSlideOpen ? "-translate-x-full" : "translate-x-0"
      }`}>
      <div className="flex flex-col items-stretch space-y-3 font-semibold font-Roboto text-xl text-zinc-700">
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
            className="px-4 h-12 rounded-md hover:bg-zinc-300"
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
            <div className="actionOverlayBtnContainer">
              <p>User Settings</p>
              <GrUserSettings />
            </div>
          </>
        ) : undefined}
        <div className="actionOverlayBtnContainer">
          <p>Toggle Mode</p>
          <MdLightMode />
          {/* <MdModeNight /> */}
        </div>
        <div className="mt-8 flex flex-col space-y-4">
          {token ? (
            <button
              type="button"
              className="btn h-12 w-1/2 max-w-[252px] mx-auto bg-zinc-900 text-white hover:bg-zinc-800 flexCenter"
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
          className="btn h-10 w-2/3 max-w-[252px] mx-auto bg-zinc-200 text-zinc-900 hover:bg-zinc-300 flex items-center justify-around"
          onClick={handleLoginLogout}>
          {token ? "Logout" : "Login"}
          {token ? <IoLogOutOutline /> : <IoLogInOutline />}
        </button>
        <div className="font-serif">
          <span>
            &copy; {new Date().getFullYear()} Insightpress. Made with ♥️ By
            Arghya-lab
          </span>
          <a href="https://github.com/Arghya-lab">
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
