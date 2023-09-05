import React from 'react'
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="px-[calc((100vw-1024px)/2)] bg-black flex justify-between items-center">
      <h1 className="text-white font-serif text-4xl m-4">Insight Social</h1>
      <div className="mx-4">
        <button type="button" className="btn m-2 bg-black text-white hover:text-zinc-200 ">
          Write
        </button>
        <button type="button" className="btn m-2 bg-white text-black hover:bg-zinc-200 " onClick={()=>navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Navbar