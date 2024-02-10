import React, { useState } from "react";
import HomeLayout from "../../layout/HomeLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCourseLecture } from "../../redux/slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";

const AddLecture = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lectures } = useSelector((state) => state.lecture);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lecture: undefined,
    videoScr: "",
    id: state._id,
  });
  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function handleVideoUpload(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    console.log(source);
    setFormData({
      ...formData,
      lecture: video,
      videoScr: source,
    });
  }
  async function formSubmitHandler(e) {
    e.preventDefault();
    const { title, description, lecture } = formData;

    if (!title || !description || !lecture) {
      toast.error("Please fill all the fields");
      return;
    }
    const response = await dispatch(addCourseLecture(formData));
    console.log(response);
    if (response?.payload?.success) {
      setFormData({
        title: "",
        description: "",
        lecture: undefined,
        videoScr: "",
        id: state._id,
      });

      navigate("/course/displaylecture");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh]  text-white flex justify-center items-center gap-10 mx-16 ">
        <div className="flex flex-col gap-5  shadow-[0_0_10px_black] relative w-[26rem] rounded-lg ">
          <header className="flex items-center justify-center relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-2 text-xl text-green-500"
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">
              Add new lecture
            </h1>
          </header>
          <form
            onSubmit={formSubmitHandler}
            className="flex flex-col gap-3 px-2"
          >
            <input
              type="text"
              name="title"
              placeholder="Enter the title of Lecture"
              onChange={onChangeHandler}
              className="bg-transparent px-3 py-1 border"
              value={formData.title}
              id=""
            />
            <textarea
              type="text"
              name="description"
              placeholder="Enter the description of Lecture"
              onChange={onChangeHandler}
              className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
              value={formData.description}
              id=""
            />
            {formData.videoScr ? (
              <div>
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      lecture: undefined,
                      videoScr: "",
                    });
                  }}
                  className="absolute left-2 text-2xl text-yellow-500  z-50"
                >
                  <AiOutlineArrowLeft />
                </button>
                <video
                  muted
                  src={formData.videoScr}
                  className="object-fill rounded-tl-lg h-full rounded-tr-lg w-full"
                  controls
                  disablePictureInPicture
                  autoPlay
                  controlsList="nodownload"
                ></video>
              </div>
            ) : (
              <div className="flex h-48 border items-center justify-center">
                <label
                  htmlFor="lecture"
                  className="text-xl cursor-pointer font-semibold"
                >
                  Choose your video
                </label>
                <input
                  type="file"
                  className="hidden"
                  name="lecture"
                  id="lecture"
                  onChange={handleVideoUpload}
                  accept="video/mp4 video/*"
                />
              </div>
            )}
            <button className="btn-primary btn py-1 font-semibold text-lg">
              Add new Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AddLecture;
