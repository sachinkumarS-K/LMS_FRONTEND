import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../redux/slices/CourseSlice";
import HomeLayout from "../../layout/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
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
      const fileReader = new FileReader();

      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setFormData({
          ...formData,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }
  async function formSubmitHandler(e) {
    e.preventDefault();
    const { title, description, category, createdBy, thumbnail, previewImage } =
      formData;

    if (!title || !description || !category || !createdBy || !thumbnail) {
      toast.error("Please fill all the fields");
      return;
    }
    const response = await dispatch(createNewCourse(formData));

    if (response?.payload?.success) {
      setFormData({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  }
  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={formSubmitHandler}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative
        "
        >
          <Link className="absolute top-8 text-2xl link text-accent cursor-pointer ">
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-center text-2xl font-bold">Create New Course</h1>
          <main className="grid grid-cols-2 gap-x-10 ">
            <div className="gap-y-6 ">
              <div className="">
                <label htmlFor="imageUploads" className="cursor-pointer">
                  {formData.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border "
                      src={formData.previewImage}
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg">
                        Upload your Course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  className="hidden"
                  name="imageUploads"
                  accept=".jpg, .jpeg,.png,.svg,.webp"
                  id="imageUploads"
                  onChange={getImage}
                />
              </div>
              <div className="flex flex-col gap-1 mt-5">
                <label htmlFor="title" className="text-lg font-extrabold">
                  Course title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter Course title"
                  className="bg-transparent px-2 py-1 border"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-lg font-extrabold">
                  Course Instructor
                </label>
                <input
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter Course Instructor"
                  className="bg-transparent px-2 py-1 border"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-lg font-extrabold">
                  Course Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter Course Category"
                  className="bg-transparent px-2 py-1 border"
                  onChange={onChangeHandler}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg font-extrabold">
                  Course description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Enter Course description"
                  className="bg-transparent px-2 py-1 border resize-none h-28 overflow-y-scroll"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </main>

          <button className="bg-yellow-600 mt-2 hover:bg-yellow-500 w-full px-5 transition-all ease-in-out rounded-lg py-2 font-semibold text-lg  ">
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;
