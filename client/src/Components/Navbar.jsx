import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { setLogout } from "../features/auth/authSlice";
import { HiOutlinePencilAlt } from 'react-icons/hi';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const token = useSelector((state)=>state.auth.token)

  const handleLoginLogout = () => {
    if (token) {
      dispatch(setLogout())
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="px-[calc((100vw-1024px)/2)] bg-zinc-950 flexCenter">
      <h1 className="text-white font-KeenyaCoffee text-4xl m-4">Insight Social</h1>
      <div className="mx-4 flex">
        <button type="button" className="btn m-2 bg-zinc-950 text-white hover:text-zinc-200 flexCenter" onClick={()=>navigate("/create")}>
        <HiOutlinePencilAlt />Write
        </button>
        <button type="button" className="btn m-2 bg-white text-zinc-950 hover:bg-zinc-200 " onClick={handleLoginLogout}>
          {token?"Logout":"Login"}
        </button>
        
      </div>
    </div>
  )
}

export default Navbar