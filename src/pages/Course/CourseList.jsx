import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layout/HomeLayout";
import { getAllCourses } from "../../redux/slices/CourseSlice";
import CourseCard from "../../components/CourseCard";

const CourseList = () => {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  async function loadCourse() {
    try {
      const data = dispatch(getAllCourses());
    } catch (error) {}
  }

  useEffect(() => {
    courseData.length == 0 && loadCourse();
  }, []);
  return (
    <div>
      <HomeLayout>
        <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white ">
          <h1 className="text-center text-3xl font-semibold ">
            Explore the courses made by
            <span className="font-bold text-yellow-500 px-2">
              Industry experts
            </span>
          </h1>
          <div className="w-[85%] mx-auto flex flex-wrap  gap-10">
            {courseData.map((course) => (
              <CourseCard key={course._id} data={course} />
            ))}
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default CourseList;
