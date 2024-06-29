import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ExpandMore as ExpandMoreIcon,
  PostAdd as PostAddIcon,
  Add as AddIcon,
  ListAlt as ListAltIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  RateReview as RateReviewIcon
} from "@mui/icons-material";
import logo from "../../assets/logo.jpg";

const Sidebar = () => {
  const [isProductsOpen, setProductsOpen] = useState(false);

  const toggleProducts = () => {
    setProductsOpen(!isProductsOpen);
  };

  return (
    <div className="bg-white text-purple-600 flex flex-col py-16 shadow-2xl min-h-screen">
      <Link to="/" className="px-8">
        <img 
          src={logo} 
          alt="Ecommerce" 
          className="w-20 h-20 transition-all duration-500 hover:filter hover:drop-shadow-[0_0_10px_#6a0dad] rounded-full" 
        />
      </Link>
      <Link to="/admin/dashboard" className="px-8 py-4 hover:text-tomato hover:scale-110 transition-all duration-500">
        <p className="flex items-center">
          <DashboardIcon className="mr-2" /> Dashboard
        </p>
      </Link>
      <div className="px-8 py-4">
        <div className="flex items-center  cursor-pointer" onClick={toggleProducts}>
        <ExpandMoreIcon className={`transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
          <p className="flex ml-2">
            Products
          </p>
          
        </div>
        {isProductsOpen && (
          <div className="ml-6 mt-2">
            <Link to="/admin/products" className="block hover:text-tomato hover:scale-110 transition-all duration-500">
              <p className="flex items-center">
                <PostAddIcon className="m-2" /> All
              </p>
            </Link>
            <Link to="/admin/product" className="block hover:text-tomato hover:scale-110 transition-all duration-500">
              <p className="flex items-center">
                <AddIcon className="m-2" /> Create
              </p>
            </Link>
          </div>
        )}
      </div>
      <Link to="/admin/orders" className="px-8 py-4 hover:text-tomato hover:scale-110 transition-all duration-500">
        <p className="flex items-center">
          <ListAltIcon className="mr-2" /> Orders
        </p>
      </Link>
      <Link to="/admin/users" className="px-8 py-4 hover:text-tomato hover:scale-110 transition-all duration-500">
        <p className="flex items-center">
          <PeopleIcon className="mr-2" /> Users
        </p>
      </Link>
      <Link to="/admin/reviews" className="px-8 py-4 hover:text-tomato hover:scale-110 transition-all duration-500">
        <p className="flex items-center">
          <RateReviewIcon className="mr-2" /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
