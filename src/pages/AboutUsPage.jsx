import React from "react";
import HomeLayout from "../layout/HomeLayout";
import aboutImage from "../assets/images/aboutMainImage.png";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import { celebrities } from "../constants/celebrityData";
import SliderCard from "../components/SliderCard";
const AboutUsPage = () => {
  const settings = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 2000,
  };
  return (
    <div>
      <HomeLayout>
        <div className="pl-20 pt-20 flex flex-col text-white min-h-[90vh] ">
          <div className="flex items-center gap-5 mx-10">
            <section className="w-1/2 mx-auto space-y-10 ">
              <h1 className="text-5xl text-yellow-500 font-semibold">
                Affordable and quality eduacation
              </h1>
              <p className="text-xl text-gray-200 ">
                {" "}
                Our goal is to provide the afoordable and quality education to
                the world. We are providing the platform for the aspiring
                teachers and students to share their skills, creativity and
                knowledge to each other to empower and contribute in the growth
                and wellness of mankind.{" "}
              </p>
            </section>
            <div>
              <img
                id="test1"
                style={{ filter: "drop-shadow(0px 10px 10px rgb(0,0,0))" }}
                src={aboutImage}
                className="drop-shadow-2xl"
                loading="lazy"
                alt="tree image"
              />
            </div>
          </div>
          <div className="crousel w-1/2 mb-20 flex flex-col justify-center  mx-auto  ">
            {
              <Slider {...settings}>
                {celebrities.map((card) => (
                  <SliderCard {...card} key={card.title} />
                ))}
              </Slider>
            }
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default AboutUsPage;
