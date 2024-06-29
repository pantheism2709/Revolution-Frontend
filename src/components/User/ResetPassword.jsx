import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, resetPassword } from "../../redux/slices/authSlices";
import { notifySuccess, notifyError } from "../../toast";
import Loader from "../layout/Loader/Loader";
import { AiOutlineLock } from "react-icons/ai";
// import MetaData from "../layout/MetaData";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { error, success, isLoading } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword({ token, passwords: formData }));
  };

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }

    if (success) {
      notifySuccess("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      {/* <MetaData title="Reset Password" /> */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-medium text-purple-700 mb-6">
          Update Password
        </h2>
        <form onSubmit={resetPasswordSubmit} className="space-y-6">
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
            <input
              type="password"
              placeholder="New Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-300 rounded-md text-base focus:border-purple-600 transition duration-300"
            />
          </div>
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-300 rounded-md text-base focus:border-purple-600 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white text-base font-medium rounded-md hover:bg-purple-800 transition duration-300"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
