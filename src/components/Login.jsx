import { useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount, login } from "../redux/slices/AuthSlice";
import { isEmail } from "../utils/regexMatcher";
const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function formSubmitHandler(e) {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!isEmail(email)) {
      toast.error("Email is invalid !");
      return;
    }

    const response = await dispatch(login(formData));

    setFormData({
      email: "",
      password: "",
    });

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
            <h1 className="text-center text-2xl font-bold">Login Page</h1>

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
              Log in
            </button>
            <p className="text-right pr-4 mt-2">
              Do'nt have an account ?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-400 ml-1 font-semibold cursor-pointer"
              >
                Signup
              </span>
            </p>
          </form>
        </div>
      </HomeLayout>
    </div>
  );
};

export default Login;
