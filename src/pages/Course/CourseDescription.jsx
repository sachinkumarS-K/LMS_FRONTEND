import React from "react";
import HomeLayout from "../../layout/HomeLayout";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseDescription = () => {
  const { state } = useLocation();
  const { role, data } = useSelector((state) => state.auth);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-20 flex-col flex items-center justify-center text-white ">
        <div className=" w-10/12 mx-auto grid grid-cols-2 gap-10 relative py-7">
          <div className="space-y-5 ">
            <img
              src={state?.thumbnail?.secure_url}
              className="w-full h-64"
              alt="course thumbnail"
            />
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-between text-xl ">
                <p className="font-semibold ">
                  <span className="to-yellow-500 font-bold px-2">
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
                <button className="bg-yellow-600 text-xl rounded-xl px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                  Watch lectures
                </button>
              ) : (
                <button className="bg-yellow-600 text-xl rounded-xl px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
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
