import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
  resetUpdateOrder
} from "../../redux/slices/orderSlices";
import {
  CircularProgress,
  Select,
  MenuItem,
  Typography
} from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { notifySuccess, notifyError } from "../../toast";
import SideBar from "./Sidebar";

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.order);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder({ id, myForm }));
  };

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      notifyError(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      notifySuccess("Order Updated Successfully");
      navigate("/admin/orders");
      dispatch(resetUpdateOrder());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, updateError, isUpdated, id, navigate]);

  return (
    <Fragment>
      <div className="flex">
        <SideBar />
        <div className="flex-grow p-6 bg-purple-100 min-h-screen">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Typography variant="h4" className="text-purple-700 mb-6">
                Process Order
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Typography variant="h6" className="text-purple-700 mb-4">
                    Shipping Info
                  </Typography>
                  <div className="mb-4">
                    <p className="font-semibold">Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Phone:</p>
                    <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>

                  <Typography variant="h6" className="text-purple-700 mb-4">
                    Payment
                  </Typography>
                  <div className="mb-4">
                    <p
                      className={`font-semibold ${
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>

                  <Typography variant="h6" className="text-purple-700 mb-4">
                    Order Status
                  </Typography>
                  <div className="mb-4">
                    <p
                      className={`font-semibold ${
                        order.orderStatus === "Delivered"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {order.orderStatus}
                    </p>
                  </div>
                </div>

                <div>
                  <Typography variant="h6" className="text-purple-700 mb-4">
                    Your Cart Items:
                  </Typography>
                  <div>
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product} className="mb-4 flex items-center">
                          <img
                            src={item.image}
                            alt="Product"
                            className="w-16 h-16 object-cover mr-4"
                          />
                          <Link to={`/product/${item.product}`} className="text-purple-700">
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

              {order.orderStatus !== "Delivered" && (
                <form
                  className="mt-6 bg-purple-50 p-6 rounded-lg shadow-md"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <Typography variant="h6" className="text-purple-700 mb-4">
                    Update Order Status
                  </Typography>
                  <div className="flex items-center mb-4">
                    <AccountTreeIcon className="text-purple-700 mr-2" />
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full"
                    >
                      <MenuItem value="">Choose Status</MenuItem>
                      {order.orderStatus === "Processing" && (
                        <MenuItem value="Shipped">Shipped</MenuItem>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      )}
                    </Select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !status}
                    className="w-full py-2 px-4 rounded-md bg-purple-500 text-white hover:bg-purple-600 focus:outline-none"
                  >
                    Update Order
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
