import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../redux/slices/orderSlices";
import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

import { useParams } from "react-router-dom";

import { notifySuccess,notifyError } from "../../toast";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  // const alert = useAlert();

  const {id} =useParams();

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <MetaData title="Order Details" /> */}
          <div className="bg-white p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-light text-purple-600 mb-8">
                Order #{order && order._id}
              </h1>
              <h2 className="text-xl font-medium">Shipping Info</h2>
              <div className="mt-4 mb-8">
                <div className="flex mb-2">
                  <p className="font-medium">Name:</p>
                  <span className="ml-2 text-gray-600">
                    {order.user && order.user.name}
                  </span>
                </div>
                <div className="flex mb-2">
                  <p className="font-medium">Phone:</p>
                  <span className="ml-2 text-gray-600">
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className="flex mb-2">
                  <p className="font-medium">Address:</p>
                  <span className="ml-2 text-gray-600">
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-medium">Payment</h2>
              <div className="mt-4 mb-8">
                <div className="flex mb-2">
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div className="flex mb-2">
                  <p className="font-medium">Amount:</p>
                  <span className="ml-2 text-gray-600">
                    {order.totalPrice && order.totalPrice}
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-medium">Order Status</h2>
              <div className="mt-4 mb-8">
                <div className="flex mb-2">
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
              <h2 className="text-xl font-medium">Order Items:</h2>
              <div className="mt-4">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product} className="flex items-center mb-4">
                      <img
                        src={item.image}
                        alt="Product"
                        className="w-12 h-12 object-cover"
                      />
                      <Link
                        to={`/product/${item.product}`}
                        className="ml-4 text-purple-600"
                      >
                        {item.name}
                      </Link>
                      <span className="ml-auto">
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
