import React, { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../redux/slices/productSlices";
import { getAllOrders } from "../../redux/slices/orderSlices";
import { clearErrors, getAllUsers } from "../../redux/slices/authSlices";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import Loader from "../layout/Loader/Loader.jsx";
import { notifyError } from "../../toast.js";

// Register necessary components from chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.order);
  // const { users } = useSelector((state) => state.auth);

  const { error, users, isgetAllUsersLoading } = useSelector(
    (state) => state.auth
  );

  let outOfStock = 0;
  products && products.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    if(error)
      {
        notifyError(error)
        dispatch(clearErrors());
      }
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());  // This function was causing infinite loading in Dashboard.js, so I moved it to App.js
  }, [dispatch]);

  let totalAmount = 0;
  orders && orders.forEach((item) => {
    totalAmount += item.totalPrice;
  });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#6a0dad"],
        borderColor: ["#6a0dad"],
        data: [0, totalAmount],
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    // aspectRatio: 1, // Adjust the aspect ratio to control the size
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

 
  
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    // aspectRatio:0.5, // Adjust the aspect ratio to control the size
  };

  if(isgetAllUsersLoading)
    return <Loader/>;

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-purple-800">Dashboard</h1>
        <div className="my-8">
          <div className="bg-purple-100 p-6 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-purple-800">
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <Link
              to="/admin/products"
              className="bg-white p-4 rounded-lg shadow-md hover:bg-purple-100 transition"
            >
              <p className="text-purple-800">Products</p>
              <p className="text-purple-800">{products && products.length}</p>
            </Link>
            <Link
              to="/admin/orders"
              className="bg-white p-4 rounded-lg shadow-md hover:bg-purple-100 transition"
            >
              <p className="text-purple-800">Orders</p>
              <p className="text-purple-800">{orders && orders.length}</p>
            </Link>
            <Link
              to="/admin/users"
              className="bg-white p-4 rounded-lg shadow-md hover:bg-purple-100 transition"
            >
              <p className="text-purple-800">Users</p>
              <p className="text-purple-800">{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="my-8 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold text-purple-800 mb-4">
            Sales Overview
          </h2>
          <div className="bg-white p-6 rounded-lg max-h-max w-9/12 shadow-2xl">
            <Line data={lineState} options={lineOptions} className="" />
          </div>
        </div>
        <div className="my-8 flex flex-col items-center justify-center ">
          <h2 className=" text-3xl font-semibold text-purple-800 mb-2">
            Stock Status
          </h2>
          <div className="bg-white p-6 rounded-lg max-h-max w-4/12 shadow-2xl ">
            <Doughnut data={doughnutState} options={doughnutOptions}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
