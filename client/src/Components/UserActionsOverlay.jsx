import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../features/auth/authSlice";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiBookmarkSimpleLight } from "react-icons/pi";
// import { PiBookmarkSimpleFill } from "react-icons/pi";
import { GrUserSettings } from "react-icons/gr";
import { MdLightMode } from "react-icons/md";
// import { MdModeNight } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";

function UserActionsOverlay({ isSidebarOpen, handleSliderState, userData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;

  const handleLoginLogout = () => {
    if (token) {
      dispatch(setLogout());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <aside
      className={`fixed top-0 right-[-556px] w-[464px] h-full p-5 pr-28 bg-zinc-100 shadow-xl shadow-zinc-950 rounded-bl-md rounded-tl-md flex flex-col justify-between transition-transform transform -translate-x-full ${
        isSidebarOpen ? "transform translate-x-0" : null
      }`}><div>
      <div className="my-6 flex justify-between items-center">
        <div className="flex items-center space-x-3 font-semibold font-Roboto text-xl text-zinc-700">
          <img
            className="w-12 aspect-square rounded-full object-cover cursor-pointer"
            src={`${serverBaseUrl}/assets/avatar/${userData?.avatarImgName}`}
            alt="Avatar"
          />
          <p>{userData?.name}</p>
        </div>
        <button
          className="px-4 h-12 rounded-md hover:bg-zinc-300"
          onClick={handleSliderState}>
          <RxCross2 />
        </button>
      </div>
      <div className="actionOverlayBtnContainer">
        <p>Home</p>
        <MdOutlineHome />
      </div>
      <div className="actionOverlayBtnContainer">
        <p>Profile</p>
        <CgProfile />
      </div>
      <div className="actionOverlayBtnContainer">
        <p>BookMarks</p>
        <PiBookmarkSimpleLight />
        {/* <PiBookmarkSimpleFill /> */}
      </div>
      <div className="actionOverlayBtnContainer">
        <p>User Settings</p>
        <GrUserSettings />
      </div>
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
            onClick={() => navigate("/create")}>
            Write
            <HiOutlinePencilAlt />
          </button>
        ) : undefined}
      </div></div>
<div>
      <button
        type="button"
        className="btn mt-36 h-10 w-2/3 max-w-[252px] mx-auto bg-zinc-200 text-zinc-900 hover:bg-zinc-300 flex items-center justify-around"
        onClick={handleLoginLogout}>
        {token ? "Logout" : "Login"}
        <IoLogOutOutline />
        <IoLogInOutline />
      </button>
      <p></p></div>
    </aside>
  );
}

UserActionsOverlay.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  handleSliderState: PropTypes.func.isRequired,
  userData: PropTypes.object,
};

export default UserActionsOverlay;
