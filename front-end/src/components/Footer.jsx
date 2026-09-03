import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-500 p-4 dark:bg-black dark:text-white">
      <div className="container mx-auto p-4 text-center flex flex-col gap-2 lg:flex-row lg:justify-between">
        <p>© All Rights Reserved 2025.</p>
        <div className="flex items-center gap-4 justify-center text-2xl sm:text-lg">
          <a href="#" className="hover:text-blue-800">
          <FaFacebook />

          </a>
          <a href="#">
          <FaLinkedin className="hover:text-blue-600" />


          </a>
          <a href="#">
          <AiFillInstagram className="hover:text-orange-500" />

          </a>
          <a href="#">
          <FaTwitter className="hover:text-black" />

          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
