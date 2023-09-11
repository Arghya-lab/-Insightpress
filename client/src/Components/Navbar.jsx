import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../features/auth/authSlice";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useEffect, useState } from "react";
// import fetchAuthor from "../utils/fetchAuthor";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null)

  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id);
  const serverBaseUrl = import.meta.env.VITE_Server_BASE_URL;

  const handleLoginLogout = () => {
    if (token) {
      dispatch(setLogout());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const authorApi = `${apiBaseUrl}/api/author/${id}`;
        const res = await fetch(authorApi);
        const authorData = await res.json();
        setUserData(authorData)
      } catch (error) {
        console.log(error);
      }
    };

    fetchAuthor()
  }, [])
  
  return (
    <div className="px-[calc((100vw-1280px)/2)] border-b-2 flexCenter">
      <h1 className="text-zinc-900 font-KeenyaCoffee text-4xl m-4">
        Insight Social
      </h1>
      <div className="mx-4 flexCenter space-x-3">
        {token ? (
          <button
            type="button"
            className="btn bg-zinc-950 text-white hover:bg-zinc-800 flexCenter"
            onClick={() => navigate("/create")}>
            <HiOutlinePencilAlt />
            Write
          </button>
        ) : undefined}
        <button
          type="button"
          className="btn bg-white text-zinc-900 hover:bg-zinc-200 "
          onClick={handleLoginLogout}>
          {token ? "Logout" : "Login"}
        </button>
        {token ? (
          <img
            src={`${serverBaseUrl}/assets/avatar/${userData?.avatarImgName}`}
            className="w-10 h-10 rounded-full object-cover"
            alt="Avatar"
          />
        ) : undefined}
      </div>
    </div>
  );
}

export default Navbar;
