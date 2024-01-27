import React, { useState } from "react";
import HomeLayout from "../../layout/HomeLayout";
import toast from "react-hot-toast";
import { isEmail } from "../../utils/regexMatcher";
import axiosInstance from "../../utils/axiosInstance";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
    const { email, message, name } = formData;
    if (!email || !name || !message) {
      toast.error("All fields are mandatory ");
      return;
    }
    if (!isEmail(email)) {
      toast.error("Email is invalid !");
      return;
    }

    try {
      const res = axiosInstance.post;
    } catch (error) {}
  }

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center ">
        <form
          noValidate
          onSubmit={formSubmitHandler}
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-lg text-white shadow-[0_0_10px_black] w-[22rem] "
        >
          <h1 className="text-3xl font-semibold ">Contact Form</h1>
          <div className="flex flex-col w-full gap-1 ">
            <label
              htmlFor="name"
              className="text-lg cursor-pointer font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              className="bg-transparent border px-2 py-1 rounded-md"
              name="name"
              placeholder="Enter your name"
              id="name"
              value={formData.name}
              onChange={onChangeHandler}
            />
          </div>
          <div className="flex flex-col w-full gap-1 ">
            <label
              htmlFor="email"
              className="text-lg cursor-pointer font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              className="bg-transparent border px-2 py-1 rounded-md"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              id="email"
              onChange={onChangeHandler}
            />
          </div>
          <div className="flex flex-col w-full gap-1 ">
            <label
              htmlFor="message"
              className="text-lg cursor-pointer font-semibold"
            >
              Message
            </label>
            <textarea
              className="bg-transparent border resize-none h-40 px-2 py-1 rounded-md"
              name="message"
              placeholder="Enter your message..."
              id="message"
              value={formData.message}
              onChange={onChangeHandler}
            />
          </div>
          <button className="bg-yellow-600 mt-2 hover:bg-yellow-500 w-full px-5 transition-all ease-in-out rounded-lg py-2 font-semibold text-lg  ">
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Contact;
