import React, { useEffect } from "react";
import HomePageImage from "../assets/images/homePageMainImage.png";
import HomeLayout from "../layout/HomeLayout";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className="w-screen min-h-screen ">
      <HomeLayout>
        <div className="pt-10  flex lg:flex-row  flex-col-reverse  items-center justify-center gap-10 mx-16 min-h-[90vh]">
          <div className="lg:w-1/2 w-full lg:space-y-6">
            <h1 className="text-5xl font-semibold">
              Find out best{" "}
              <span className="text-yellow-500 font-bold">Online Courses</span>
            </h1>
            <p className="text-xl  text-slate-800">
              We have a large library of Courses taught by highly skilled and
              qualified faculties at a very affordable cost.
            </p>
            <div className="space-x-6 ">
              <Link to="/Courses">
                <button
                  data-aos="flip-left"
                  data-aos-delay="50"
                  className="bg-yellow-500 px-5 py-3 text-white rounded-xl text-lg font-semibold cursor-pointer hover:bg-white hover:text-yellow-500  hover:border-2 transition-all duration-300"
                >
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
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="lg:w-1/2 w-full flex items-center justify-center"
          >
            <img src={HomePageImage} alt="homePage Image" />
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default HomePage;
