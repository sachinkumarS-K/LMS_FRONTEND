import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const HomeLayout = ({ children }) => {
  function changWidth() {
    const drawerSider = document.querySelector(".drawer-side");
    drawerSider.style.width = "auto";
  }
  function hideDrawer() {
    const el = document.querySelector(".drawer-toggle");
    el.checked = false;
    changWidth();
  }
  return (
    <div className="min-h-[90vh]  ">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changWidth}
              size={"32px"}
              className="font-bold text-white m-4 "
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-52 sm:w-80 bg-base-100 text-base-content relative ">
            {/* Sidebar content here */}
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle className="text-3xl" />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Courses">All Courses</Link>
            </li>
            <li>
              <Link to="/Contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
