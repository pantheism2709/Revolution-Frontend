import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { clearCartItems } from '../../redux/slices/cartSlices';

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCartItems());
  }, [dispatch]);

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen text-center p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
      >
        <svg
          className="text-purple-600"
          style={{ width: '10rem', height: '10rem' }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="10" fill="#af08fc" />
          <motion.path
            d="M9 12l2 2 4-4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 150 }}
        className="m-8"
      >
        <Typography className="text-2xl text-purple-600">
          Your Order has been Placed Successfully
        </Typography>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5, type: "spring", stiffness: 150 }}
      >
        <Link
          to="/orders"
          className="mt-12 bg-purple-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-purple-700"
        >
          View Orders
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default OrderSuccess;
