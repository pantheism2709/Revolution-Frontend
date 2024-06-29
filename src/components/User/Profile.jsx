import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../redux/slices/authSlices"; // Ensure the correct path
import { Tooltip } from 'react-tooltip'

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full flex">
        
        {/* Left Side - User Image */}
        <div className="relative flex justify-center items-center flex-col w-1/2 border-r-2 border-purple-300">
          <img
            src={
              user.avatar?.url ||
              "https://randomuser.me/api/portraits/med/men/75.jpg"
            }
            alt="Profile"
            className="w-64 h-64 rounded-full mb-4"
          />
          <Tooltip id="my-tooltip" />
          <Link
            to="/edit-profile"
            className="absolute bottom-2 right-2 hover:scale-105 "
            data-tooltip-id="my-tooltip" data-tooltip-content="Edit Profile"
          >
            <div className="bg-white p-2 rounded-full shadow-lg border-2 border-purple-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-purple-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* Right Side - User Details */}
        <div className="w-1/2 p-8 ">
          <h1 className="text-4xl font-bold mb-6 text-purple-800 text-center border-b-2">Profile</h1>
          <div className="">
            <h2 className="text-2xl font-bold text-purple-800 m-4 ">
              <span className="  text-black font-medium">Name : </span>{user.name || "John Doe"}
            </h2>
            <h2 className="text-2xl font-bold text-purple-800 m-4 ">
            <span className="  text-black font-medium">Email : </span> {user.email || "johndoe@example.com"}
            </h2>
            <h2 className="text-2xl font-bold text-purple-800 m-4 ">
            <span className="  text-black font-medium">Role : </span> {user.role || "User"}
            </h2>
          </div>
          <div className="mt-8 space-y-4 text-center flex flex-col justify-between">
            <Link to="/orders">
              <button className="bg-purple-800 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-300 w-full">
                My Orders
              </button>
            </Link>
            <Link to="/password/update">
              <button className="bg-purple-800 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-300 w-full">
                Change Password
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
