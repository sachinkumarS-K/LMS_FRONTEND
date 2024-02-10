import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../redux/slices/LectureSlice";

const Displaylectures = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);
  const [currentVideo, setCurrentVideo] = useState(0);
  lectures && console.log(lectures);
  useEffect(() => {
    if (!state) navigate("/courses");
    state && dispatch(getCourseLecture(state._id));
  }, []);
  async function deleteLectureHandler(courseId, lectureId) {
    await dispatch(deleteCourseLecture({ courseId, lectureId }));
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col gap-10 items-center justify-start py-20  text-center ">
        <div className="text-center  text-3xl font-semibold text-yellow-500 ">
          Course Name : {state?.title}
        </div>
        <div className="flex w-full gap-20 justify-center align-baseline">
          {/* left section */}
          {lectures && lectures.length > 0 && (
            <div className="space-y-5 w-[28rem] max-h-64 p-2 rounded-lg shadow-[0_0_10px_black] ">
              <video
                className="object-fill rounded-tl-lg h-full rounded-tr-lg w-full"
                src={state && lectures[currentVideo]?.lecture?.secure_url}
                controls
                disablePictureInPicture
                muted
                autoPlay
                controlsList="nodownload"
              ></video>
              <div>
                <h1>
                  <span className="text-yellow-500 ">Title : {"  "}</span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className="text-yellow-500  line-clamp-4">
                    Description : {"  "}
                  </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>
          )}
          {/* Right section */}
          <div>
            <ul className="min-w-[28rem] max-w-[36rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 ">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures List</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addLecture", { state: { ...state } })
                    }
                    className="py-2 px-3 bg-gray-100 text-lg font-semibold rounded-lg"
                  >
                    Add New Lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li
                      className="space-y-2 flex gap-4 items-center justify-between"
                      key={lecture._id}
                    >
                      <p
                        className="cursor-pointer"
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span className="pr-5">Lecture {idx + 1}</span>
                        {lecture.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            deleteLectureHandler(state._id, lecture._id)
                          }
                          className="py-1 px-2 bg-red-400 text-white text-sm font-semibold rounded-lg"
                        >
                          Delete Lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Displaylectures;
