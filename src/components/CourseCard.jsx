import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="text-white w-[22rem] h-[430px] shadow-lg cursor-pointer group overflow-hidden ">
      <div
        className="overflow-hidden"
        onClick={() => navigate("/course/description", { state: { ...data } })}
      >
        <img
          src={data?.thumbnail?.secure_url}
          className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale-[1,2] transition-all ease-in-out duration-300 "
          alt=""
        />
        <div className="p-3 space-y-1 text-white">
          <h1 className="text-xl font-bold text-yellow-500 line-clamp-2">
            {data?.title}
          </h1>
          <p className="line-clamp-2">{data?.description}</p>
          <p className="font-semibold">
            {" "}
            <span className="text-yellow-500 font-bold">Categrory : </span>{" "}
            {data?.category}
          </p>
          <p className="font-semibold">
            {" "}
            <span className="text-yellow-500 font-bold">
              Total lectures :
            </span>{" "}
            {data?.numberOfLectures > 0 && data?.numberOfLectures}
          </p>
          <p className="font-semibold">
            {" "}
            <span className="text-yellow-500 font-bold">
              Instructor :{" "}
            </span>{" "}
            {data?.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
