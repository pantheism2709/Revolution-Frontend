// src/components/PaymentWrapper.js
import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";

import { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";

import axios from "axios";


// const stripePromise = loadStripe("your-stripe-public-key-here");

const apiUrl=import.meta.env.VITE_API_URL;

const PaymentWrapper = () => {
  const dispatch=useDispatch();

  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);

  
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {

    getStripeApiKey();
   
  }, [dispatch])
  

  async function getStripeApiKey() {
    const { data } = await axios.get(`${apiUrl}/api/v1/stripeapikey`,{
      withCredentials:true
    });
    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {

    getStripeApiKey();
 
  }, [dispatch])
  

  return (
  <Elements stripe={loadStripe(stripeApiKey)}>
    <Payment />
  </Elements>
  );
}


export default PaymentWrapper;
