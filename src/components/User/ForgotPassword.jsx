import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../redux/slices/authSlices";
import { notifySuccess, notifyError } from "../../toast";
import Loader from "../layout/Loader/Loader";
import { AiOutlineMail } from "react-icons/ai";
// import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, message, isLoading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }
    if (message) {
      notifySuccess(message);
    }
  }, [dispatch, error, message]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      {/* <MetaData title="Forgot Password" /> */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-medium text-purple-700 mb-6">
          Forgot Password
        </h2>
        <form onSubmit={forgotPasswordSubmit} className="space-y-6">
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-300 rounded-md text-base focus:border-purple-600 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white text-base font-medium rounded-md hover:bg-purple-800 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
