import React from "react"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { setLogout } from "../features/auth/authSlice";
import { HiOutlinePencilAlt } from 'react-icons/hi';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const name = useSelector((state)=>state.auth.name)

  const handleClick = () => {
    if (name) {
      dispatch(setLogout())
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="px-[calc((100vw-1024px)/2)] bg-black flexCenter">
      <h1 className="text-white font-KeenyaCoffee text-4xl m-4">Insight Social</h1>
      <div className="mx-4 flex">
        <button type="button" className="btn m-2 bg-black text-white hover:text-zinc-200 flexCenter">
        <HiOutlinePencilAlt />Write
        </button>
        <button type="button" className="btn m-2 bg-white text-black hover:bg-zinc-200 " onClick={handleClick}>
          {name?"Logout":"Login"}
        </button>
        
      </div>
    </div>
  )
}

export default Navbar