import React, { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
import Typography from "@mui/material/Typography";
// import { useAlert } from "react-alert";



import { notifySuccess,notifyError } from "../../toast";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../redux/slices/orderSlices";

const apiUrl = import.meta.env.VITE_API_URL;





const Payment = () => {

  
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
//   const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const requestData = {
    paymentData,
    shippingInfo,
    user
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${apiUrl}/api/v1/payment/process`,
         requestData,
         config
      );

      // console.log(data)

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });


      // console.log(result)

      if (result.error) {
        payBtn.current.disabled = false;
        notifyError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          notifyError("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;

      console.log(error.response.data.message)
      notifyError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {/* <MetaData title="Payment" /> */}
      <CheckoutSteps activeStep={2} />
      
      <div className="grid place-items-center bg-white h-65vh my-8">
        <form
          className="w-11/12 md:w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 square-form"
          onSubmit={submitHandler}
        >
          <Typography className="text-xl text-purple-700 mb-4">Card Info</Typography>
          <div className="flex items-center mb-4">
            <CreditCardIcon className="mr-2 text-purple-700" />
            <CardNumberElement className="form-input p-2 w-full border border-gray-300 rounded" />
          </div>
          <div className="flex items-center mb-4">
            <EventIcon className="mr-2 text-purple-700" />
            <CardExpiryElement className="form-input p-2 w-full border border-gray-300 rounded" />
          </div>
          <div className="flex items-center mb-4">
            <VpnKeyIcon className="mr-2 text-purple-700" />
            <CardCvcElement className="form-input p-2 w-full border border-gray-300 rounded" />
          </div>
          <button
            type="submit"
            ref={payBtn}
            className="bg-purple-700 text-white font-bold py-2 px-4 rounded hover:bg-purple-800 w-full"
          >
            {`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
