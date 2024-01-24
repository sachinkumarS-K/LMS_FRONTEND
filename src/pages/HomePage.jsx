import React from "react";
import HomePageImage from "../assets/images/homePageMainImage.png";
import HomeLayout from "../layout/HomeLayout";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-screen">
      <HomeLayout>
        <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
          <div className="w-1/2 space-y-6">
            <h1 className="text-5xl font-semibold">
              Find out best{" "}
              <span className="text-yellow-500 font-bold">Online Courses</span>
            </h1>
            <p className="text-xl text-gray-200">
              We have a large library of Courses taught by highly skilled and
              qualified faculties at a very affordable cost.
            </p>
            <div className="space-x-6">
              <Link to="/Courses">
                <button className="bg-yellow-500 px-5 py-3 rounded-xl text-lg font-semibold cursor-pointer hover:bg-yellow-600 transition-all duration-300">
                  Explore Courses
                </button>
              </Link>
              <Link to="/contact">
                <button className=" border border-yellow-500 px-5 py-3 rounded-xl text-lg font-semibold cursor-pointer hover:bg-yellow-500 transition-all duration-300 ease-in-out">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img src={HomePageImage} alt="homePage Image" />
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default HomePage;
