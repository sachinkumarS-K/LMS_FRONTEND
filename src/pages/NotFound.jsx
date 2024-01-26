import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import pageNotFound from "../assets/images/pageNotFound.jpg";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen relative w-full flex flex-col justify-center items-center bg-[#1A2238]">
      {/* <h1 className="text-9xl font-extrabold tracking-widest text-white">
        404
      </h1>
      <div className="bg-slate-800 px-4 rounded-lg text-white text-lg   rotate-12 absolute ">
        Page Not Found
      </div> */}
      <img
        className="bg-cover  w-full h-full"
        src={pageNotFound}
        alt="pageNotFound"
      />
      <button className="mt-5 absolute top-10 left-20">
        <div
          onClick={() => navigate(-1)}
          className="relative text-sm font-medium transition-all duration-500 ease-in-out hover:text-[#FF6A3D]"
        >
          <FaArrowLeft className="text-5xl" />
        </div>
      </button>
    </div>
  );
};

export default NotFound;
