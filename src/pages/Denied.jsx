import React from "react";
import { useNavigate } from "react-router-dom";

const Denied = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] ">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        403
      </h1>
      <div className="bg-black px-2  text-white text-lg rounded rotate-12 absolute">
        Access Denied
      </div>
      <button onClick={() => navigate(-1)} className="mt-5 ">
        <span>
          <span className="relative block px-8 py-3 transition-all ease-in-out duration-400 hover:bg-[#0a0c1e] bg-[#1A2238] border-current border rounded-lg ">
            Go Back
          </span>
        </span>
      </button>
    </div>
  );
};

export default Denied;
