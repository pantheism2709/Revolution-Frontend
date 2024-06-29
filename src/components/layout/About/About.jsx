import React from "react";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";
// import InstagramIcon from "@material-ui/icons/Instagram";

import profilePic from "../../../assets/profilePic.jpeg";

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-purple-100 p-4">
      <div className=" bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 p-6 md:flex  mb-2 md:mb-2">
        <div className="flex-none h-full w-full md:w-1/2 md:h-auto rounded-md">
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transform transition-shadow duration-300   "
          />
        </div>
        <div className="flex flex-col justify-between w-full md:w-1/2 p-6 text-primary">
          <div className="flex flex-col">
            <h2 className="text-3xl  font-semibold mb-4 text-purple-700  ">
              About Me
            </h2>
            <p className="mb-4 font-thin text-purple-700">
              Hi, I'm Sachin Mishra , a passionate web developer specializing in
              creating awesome web applications. I love coding, learning new
              technologies, and working on innovative projects.
            </p>
          </div>
          <div className="flex justify-start space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-purple-500"
            >
              <Facebook fontSize="large" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-purple-500"
            >
              <Twitter fontSize="large" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-purple-500"
            >
              <LinkedIn fontSize="large" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-purple-500"
            >
              <Instagram fontSize="large" />
            </a>
          </div>
        </div>
      </div>

      <h2 className=" text-2xl  font-semibold my-3 text-purple-700  ">
              Made with Love ❤️
            </h2>
    </div>
  );
};

export default About;
