// NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../../../assets/Notfound.jpg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
       
      <div className="flex flex-col bg-white shadow-2xl overflow-hidden min-w-96 max-h-96  rounded-2xl">
        <div
          className="bg-no-repeat bg-cover h-96"
          style={{ backgroundImage: `url(${NotFoundImage})` }}
        ></div>
        
      </div>

      <div className="p-8 text-center">
          <Link
            to="/"
            className="text-lg py-2 px-4 bg-purple-700 rounded-lg text-white hover:bg-purple-900 transition-colors duration-300 shadow-md"
          >
            Go back to Home
          </Link>
        </div>
    </div>
  );
};

export default NotFound;
