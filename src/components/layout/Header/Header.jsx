import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlices"; // Ensure this path is correct
import logo from "../../../assets/logo.jpg";
import { notifySuccess } from "../../../toast";
import {
  AccountCircle,
  ShoppingCart,
  ExitToApp,
  ListAlt,
  Edit,
  Dashboard,
} from "@mui/icons-material";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    notifySuccess("Logged Out");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Fragment>
      <nav className="bg-purple-800 text-white flex justify-between items-center p-3 fixed w-full top-0 z-10 shadow-2xl">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src={logo}
              alt="Brand Logo"
              className="w-10 h-10 rounded-full mx-2"
            />
          </Link>
          <ul className="flex space-x-11">
            <li className="hover-underline-animation">
              <Link to="/">Home</Link>
            </li>
            <li className="hover-underline-animation">
              <Link to="/products">Products</Link>
            </li>
            <li className="hover-underline-animation">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="hover-underline-animation">
              <Link to="/about">About</Link>
            </li>
            <li className="relative hover-underline-animation">
              <Link to="/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </Link>
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transform translate-x-2 -translate-y-2">
                  {cartItems.length}
                </span>
              )}
            </li>
          </ul>
        </div>

        <div className="flex space-x-4 items-center">
          <Link to="/search">
            <button className="rounded-3xl bg-white text-purple-800 px-4 py-2 hover:bg-purple-600 hover:text-white transition duration-300">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </Link>

          {isAuthenticated && user ? (
            <div
              className="relative mr-8"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <img
                src={
                  user.avatar.url ||
                  "https://randomuser.me/api/portraits/med/men/75.jpg"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-px w-48 bg-purple-50 rounded-md shadow-lg py-1 z-20 animate-fadeIn ">
                  {user && user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-200"
                    >
                      <Dashboard className="mr-2" /> Dashboard
                    </Link>
                  )}
                  <Link
                    to="/orders"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-200"
                  >
                    <ListAlt className="mr-2" /> Orders
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-200"
                  >
                    <ShoppingCart className="mr-2" /> Cart
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-200"
                  >
                    <AccountCircle className="mr-2" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-200"
                  >
                    <ExitToApp className="mr-2" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login">
                <button className="rounded-3xl bg-white text-purple-800 px-4 py-2 hover:bg-purple-600 hover:text-white transition duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-3xl bg-white text-purple-800 px-4 py-2 hover:bg-purple-600 hover:text-white transition duration-300">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div className="pt-16">
        {" "}
        {/* Adjust this padding to match the height of the header */}
        {/* Rest of your content */}
      </div>
    </Fragment>
  );
}

export default Header;
