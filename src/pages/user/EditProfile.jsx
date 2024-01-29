import React, { useState } from "react";
import HomeLayout from "../../layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { updateProfile } from "../../redux/slices/AuthSlice";
const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: null,
  });
  function onChangeHandler(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  function getImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  async function formSubmitHandler(e) {
    e.preventDefault();
    const { fullName, avatar } = data;
    if (!fullName || !avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (fullName.length < 5) {
      toast.error("Name  must be atleast 5 characters ");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("avatar", avatar);

    const res = await dispatch(updateProfile(formData));
    console.log(res);
    if (res?.payload?.success) {
      setData({
        previewImage: "",
        fullName: "",
        avatar: null,
      });
      navigate("/user/profile");
    }
  }
  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={formSubmitHandler}
          className="flex flex-col justify-center shadow-[0_0_10px_black] gap-5 p-4 text-white w-80 min-h-[26rem]"
        >
          <h1 className="text-center  font-semibold text-2xl"> Edit Profile</h1>
          <label htmlFor="image_uploads" className="cursor-pointer ">
            {data.previewImage ? (
              <img
                src={data.previewImage}
                className="w-32 h-32 rounded-full m-auto"
              />
            ) : (
              <BsPersonCircle className="w-28 cursor-pointer h-28 m-auto rounded-full" />
            )}
          </label>
          <input
            type="file"
            onChange={getImage}
            className="hidden"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg, .jpeg,.png,.svg"
          />
          <div className="flex flex-col gap-1 ">
            <label htmlFor="fullName" className="text-lg font-semibold">
              Full Name
            </label>
            <input
              type="text"
              className="bg-transparent border px-2 py-1 rounded-sm"
              onChange={onChangeHandler}
              value={data.fullName}
              name="fullName"
              id="fullName"
              placeholder="Enter your name"
            />
          </div>
          <button className="bg-yellow-600 mt-2 hover:bg-yellow-500 w-full px-5 transition-all ease-in-out rounded-lg py-2 font-semibold text-lg  cursor-pointer">
            Update Profile
          </button>
          <Link to="/user/profile">
            <p className="cursor-pointer w-full flex items-center text-accent justify-center  ">
              <AiOutlineArrowLeft className="mr-2" /> Go Back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
};

export default EditProfile;
