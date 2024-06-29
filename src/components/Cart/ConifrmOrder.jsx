import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useEffect } from "react";

const ConfirmOrder = () => {

  const { user } = useSelector((state) => state.auth);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  

 

   


  

 
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const navigate = useNavigate();

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="flex flex-wrap justify-center p-5 bg-white">
        {/* Left Section */}
        <div className="w-full lg:w-3/4 lg:pr-5 lg:overflow-y-auto max-h-screen">
          <div className="mb-8">
            <Typography variant="h6" className="text-purple-600">Shipping Info</Typography>
            <div className="p-5 bg-gray-100 rounded-lg">
              <div className="mb-2">
                <p className="font-semibold">Name:</p>
                {
                <span>{user && user.name}</span>
              }
              </div>
              <div className="mb-2">
                <p className="font-semibold">Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p className="font-semibold">Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div>
            <Typography variant="h6" className="text-purple-600">Your Cart Items:</Typography>
            <div className="p-5  bg-gray-100 rounded-lg">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product} className="flex items-center mb-2">
                    <img src={item.image} alt="Product" className="w-16 h-16 object-cover mr-4" />
                    <Link to={`/product/${item.product}`} className="text-purple-600 hover:underline">
                      {item.name}
                    </Link>{" "}
                    <span className="ml-auto">
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full lg:w-1/4 lg:pl-5 fixed lg:static bottom-0 lg:top-0 lg:right-0 lg:h-full bg-white ">
    
        <Typography variant="h6" className="text-purple-600 mb-5">Order Summary</Typography>
          <div className="p-5 bg-gray-100 rounded-lg lg:sticky lg:top-20">
         
            
            <div className="mb-2">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div className="flex justify-between">
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-5">
              <p>Total:</p>
              <span>₹{totalPrice}</span>
            </div>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={proceedToPayment}
            >
              Proceed To Payment
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
