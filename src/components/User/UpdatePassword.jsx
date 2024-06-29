import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors, resetSuccess } from "../../redux/slices/authSlices";
import { AiOutlineLock } from "react-icons/ai";
import Loader from "../layout/Loader/Loader";
import { notifyError, notifySuccess } from "../../toast";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const { isLoading, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (success) {
      notifySuccess("Password Changed");
      navigate("/profile");
      dispatch(resetSuccess());
    }

    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }
  }, [success, error, dispatch, navigate]);

  if (isLoading) return <Loader />;

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200 fixed top-0 left-0">
      <div className="bg-white w-full max-w-md h-auto p-8 box-border overflow-hidden rounded-lg shadow-lg">
        <h2 className="text-center text-gray-800 text-xl font-medium mb-6 border-b pb-2 border-gray-300">
          Update Password
        </h2>
        <form
          className="flex flex-col items-center space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
            <input
              type="password"
              placeholder="Old Password"
              className="w-full p-4 pl-12 box-border border border-gray-300 rounded-md text-base outline-none focus:border-purple-600 transition duration-300"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="relative w-full">
            <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-4 pl-12 box-border border border-gray-300 rounded-md text-base outline-none focus:border-purple-600 transition duration-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="relative w-full">
            <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-4 pl-12 box-border border border-gray-300 rounded-md text-base outline-none focus:border-purple-600 transition duration-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white text-base font-medium rounded-md hover:bg-purple-800 transition duration-300 outline-none shadow-lg"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
