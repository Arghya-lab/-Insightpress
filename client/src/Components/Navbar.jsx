import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../features/auth/authSlice";
import { HiOutlinePencilAlt } from "react-icons/hi";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const avatarImgName = useSelector((state) => state.auth.avatarImgName);
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
    <div className="px-[calc((100vw-1280px)/2)] bg-zinc-950 flexCenter">
      <h1 className="text-white font-KeenyaCoffee text-4xl m-4">
        Insight Social
      </h1>
      <div className="mx-4 flexCenter space-x-3">
        {token ? (
          <button
            type="button"
            className="btn bg-zinc-950 text-white hover:text-zinc-200 flexCenter"
            onClick={() => navigate("/create")}>
            <HiOutlinePencilAlt />
            Write
          </button>
        ) : undefined}
        <button
          type="button"
          className="btn bg-white text-zinc-950 hover:bg-zinc-200 "
          onClick={handleLoginLogout}>
          {token ? "Logout" : "Login"}
        </button>
        {token ? (
          <div>
            <img
              src={`${serverBaseUrl}/assets/${avatarImgName}`}
              className="w-10 h-10 rounded-full object-cover"
              alt="Avatar"
            />
          </div>
        ) : undefined}
      </div>
    </div>
  );
}

export default Navbar;
