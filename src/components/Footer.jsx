import { BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";

import { FaFacebook } from "react-icons/fa";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <footer className="relative left-0 bottom-0 h-[10vh] flex flex-col sm:flex-row items-center justify-between text-white bg-gray-700 py-5 sm:px-20 ">
        <section className="text-lg ">
          Copyright {year} | All rights reserved
        </section>
        <section className="flex items-center justify-center gap-5 text-2xl text-white">
          <a className="hover:text-[#1DA1F2] cursor-pointer transition-all ease-in-out delay-300">
            <BsTwitter />
          </a>

          <a className="hover:text-[#4267B2]  cursor-pointer transition-all ease-in-out delay-300">
            <FaFacebook />
          </a>
          <a className="hover:text-[#0096D6] cursor-pointer transition-all ease-in-out delay-300">
            <BsLinkedin />
          </a>
          <a className="hover:text-[#E1306C] cursor-pointer transition-all ease-in-out delay-300">
            <BsInstagram />
          </a>
        </section>
      </footer>
    </>
  );
};

export default Footer;
