import React from "react";
import HomeLayout from "../../layout/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-20 flex-col flex   items-center justify-center  ">
        <div className="  md:w-10/12 w-full mx-auto grid md:grid-cols-2 gap-16 relative py-7">
          <div className="space-y-5 ">
            <img
              src={state?.thumbnail?.secure_url}
              className="w-full min-h-64 max-h-72 rounded-xl object-cover"
              alt="course thumbnail"
            />
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-between text-xl ">
                <p className="font-semibold ">
                  <span className="text-yellow-500 font-bold px-2">
                    {" "}
                    Total Lectures :
                  </span>
                  {state?.numberOfLectures}
                </p>
                <p className="font-semibold ">
                  <span className="to-yellow-500 font-bold px-2">
                    {" "}
                    Instructor :
                  </span>
                  {state?.createdBy}
                </p>
              </div>
              {role === "ADMIN" || data?.subscription?.status === "ACTIVE" ? (
                <button
                  onClick={() =>
                    navigate("/course/displaylecture", { state: { ...state } })
                  }
                  className="bg-yellow-600 tracking-wider text-xl rounded-xl px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Watch lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-yellow-600 tracking-wider text-xl rounded-xl px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2 text-xl">
            <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
              {state?.title}
            </h1>
            <p className="text-yellow-500">Course description</p>
            <p> {state?.description} </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
