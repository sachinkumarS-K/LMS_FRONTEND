import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold tracking-widest text-white">
        404
      </h1>
      <div className="bg-slate-800 px-4 rounded-lg text-white text-lg   rotate-12 absolute ">
        Page Not Found
      </div>
      <button className="mt-5">
        <div
          onClick={() => navigate(-1)}
          className="relative text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring "
        >
          <span className="relative block px-8 py-3 bg-[#1A2238] rounded-lg border border-current ">
            Go Back
          </span>
        </div>
      </button>
    </div>
  );
};

export default NotFound;
