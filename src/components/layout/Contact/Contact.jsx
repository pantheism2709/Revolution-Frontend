import React from "react";
import EmailIcon from "@mui/icons-material/Email";

const Contact = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-100">
      <div className="flex flex-col justify-center items-center p-8 rounded-2xl shadow-2xl bg-white text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Contact Us</h2>
        <p className="text-purple-700 mb-4">
          Have a question , suggestion , want to get in touch ? Drop us a message! 
        </p>
        <a className="block w-full" href="mailto:your-email@example.com">
          <button
            className="text-white rounded-lg bg-purple-700 px-4 py-2 font-thin hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-xl"
          >
             <EmailIcon className=" mx-1" />
            Email Us
          </button>
        </a>
      </div>
    </div>
  );
};

export default Contact;
