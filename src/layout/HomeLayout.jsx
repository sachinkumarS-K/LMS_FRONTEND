import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";
import img from "../assets/images/Untitled1.png";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }
  return (
    <div className="min-h-[90vh] w-full  ">
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
          <ul className="menu p-4 w-[15rem] overflow-hidden h-full space-y-5 text-base-content font-semibold text-xl sm:w-80 bg-base-300  relative ">
            {/* Sidebar content here */}
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle className="text-3xl" />
              </button>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/dashboard">Admin DashBoard</Link>
              </li>
            )}
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
            {!isLoggedIn && (
              <div className=" absolute bottom-16 w-full ">
                <div className="w-9/12 mx-auto space-x-4">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-lg inline-flex
                 items-center"
                  >
                    <Link to="/login"> Login</Link>
                  </button>
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center">
                    <Link to="/register"> Sign Up</Link>
                  </button>
                </div>
              </div>
            )}
            {isLoggedIn && (
              <div className=" absolute bottom-16 w-full ">
                <div className="w-9/12 mx-auto space-x-4">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-lg inline-flex
                 items-center"
                  >
                    <Link to="/user/profile"> Profile</Link>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>

      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
