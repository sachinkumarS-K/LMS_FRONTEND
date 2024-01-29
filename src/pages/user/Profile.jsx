import React from "react";
import HomeLayout from "../../layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.data);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex justify-center items-center ">
        <div className="my-10 flex flex-col gap-4 p-4  rounded-lg text-white shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            className="w-40 m-auto rounded-full border"
            alt=""
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2 space-y-1 pb-4 ">
            <p className="px-10">Email : </p>
            <p>{userData?.email}</p>

            <p className="px-10">Role : </p>
            <p>{userData?.role}</p>

            <p className="px-10"> Subscription : </p>
            <p>
              {" "}
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/changepassword"
              className="bg-yellow-600 mt-2 hover:bg-yellow-500 w-1/2 px-5 transition-all duration-300 ease-in-out rounded-lg py-2 font-semibold text-lg cursor-pointer text-center "
            >
              <button>Change Password</button>
            </Link>
            <Link
              to="/user/editprofile"
              className="bg-yellow-600 mt-2 hover:bg-yellow-500 w-1/2 px-5 transition-all duration-300 ease-in-out rounded-lg py-2 font-semibold text-lg cursor-pointer text-center "
            >
              <button>Edit Profile</button>
            </Link>
          </div>
          {userData?.subscription?.status === "active" && (
            <button className="w-full bg-red-600 hover:bg-red-500  px-5 transition-all duration-300 ease-in-out rounded-lg py-2 ">
              {" "}
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Profile;
