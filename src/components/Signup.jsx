import React, { useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/slices/AuthSlice";
import { checkPassword, isEmail } from "../utils/regexMatcher";
const Signup = () => {
  const [img, setImg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showImgError, setShowImgError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function getImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setFormData({
        ...formData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();

      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImg(this.result);
      });
    }
  }

  async function formSubmitHandler(e) {
    e.preventDefault();
    const { email, password, fullName, avatar } = formData;

    if (!email || !password || !fullName) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!avatar) {
      setShowImgError(!showImgError);
      return;
    }
    if (fullName.length < 5) {
      toast.error("Name should be atleast 5 characters");
      return;
    }
    if (!isEmail(email)) {
      toast.error("Email is invalid !");
      return;
    }

    if (!checkPassword(password)) {
      toast.error("Password is invalid");
      setShowPasswordError(!showPasswordError);
      return;
    }
    const userData = new FormData();
    userData.append("fullName", fullName);
    userData.append("email", email);
    userData.append("password", password);
    userData.append("avatar", avatar);
    console.log(userData);
    const response = await dispatch(createAccount(userData));

    setFormData({
      fullName: "",
      email: "",
      avatar: "",
      password: "",
    });
    setImg("");
    console.log(response);
    if (response.payload) navigate("/");
  }
  return (
    <div>
      <HomeLayout>
        <div className="min-h-[90vh] flex overflow-x-auto items-center justify-center ">
          <form
            noValidate
            onSubmit={formSubmitHandler}
            className="flex outline-none flex-col justify-center gap-3 rounded-lg p-4 text-white shadow-slate-600 w-96 shadow-lg ackdrop-blur-sm bg-white/20 px-5"
          >
            <h1 className="text-center text-2xl font-bold">
              Registration Page
            </h1>
            <label htmlFor="imgUpload" className="relative">
              {img ? (
                <img className="w-28 h-24 rounded-full m-auto" src={img} />
              ) : (
                <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
              )}
              {showImgError && (
                <p className="absolute top-2 right-0 text-red-500">
                  *Select an image
                </p>
              )}
            </label>

            <input
              type="file"
              className="hidden"
              accept=".jpg, .jpeg,.png,.svg"
              name="avatar"
              onChange={(e) => {
                getImage(e);
                showImgError && setShowImgError(!showImgError);
              }}
              id="imgUpload"
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Enter your Name"
                id="name"
                onChange={onChangeHandler}
                value={formData.fullName}
                className="bg-transparent outline-none px-2 rounded-md py-2 border"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={onChangeHandler}
                value={formData.email}
                placeholder="Enter your Email"
                id="email"
                className="bg-transparent px-2 outline-none rounded-md py-2 border"
              />
            </div>

            <div className="flex flex-col relative  gap-1">
              <label htmlFor="password" className="font-semibold ">
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                onChange={(e) => {
                  onChangeHandler(e);
                  showPasswordError && setShowPasswordError(!showPasswordError);
                }}
                value={formData.password}
                placeholder="Enter your Password"
                id="password"
                className="bg-transparent px-2 outline-none rounded-md py-2 border"
              />
              {showPass ? (
                <IoEye
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-5 cursor-pointer top-10 text-xl"
                />
              ) : (
                <IoEyeOff
                  onClick={() => setShowPass(!showPass)}
                  className="absolute cursor-pointer right-5 top-10 text-xl"
                />
              )}
              {showPasswordError && (
                <p className="text-sm text-red-600 px-3 py-2">
                  <span className="text-xl">*</span> Password contains atleast 8
                  digits,one capital and one special character.{" "}
                </p>
              )}
            </div>
            <button className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out  rounded-lg py-2 font-semibold">
              Create Account
            </button>
            <p className="text-right pr-4 mt-2">
              Already have an account ?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-400 ml-1 font-semibold cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </HomeLayout>
    </div>
  );
};

export default Signup;
