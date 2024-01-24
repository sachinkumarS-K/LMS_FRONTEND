import React from "react";

const SliderCard = ({ image, title, description, slideNumber }) => {
  return (
    <div className="flex mt-5 flex-col w-full items-center justify-center">
      <img
        className="w-48   rounded-full border-[3px] border-gray-400 "
        src={image}
        alt=""
      />
      <p className="text-xl text-center py-5 text-gray-200">{description}</p>
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
  );
};

export default SliderCard;
