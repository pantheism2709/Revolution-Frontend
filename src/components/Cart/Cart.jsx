import React, { Fragment } from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../redux/slices/cartSlices";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {  isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  // console.log(cartItems)

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

 

  const checkoutHandler = () => {
    if(!isAuthenticated)
      navigate("/login")
    else
    navigate
    navigate("/shipping")
  };

  // Calculate gross total and GST
  const grossTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const gst = grossTotal * 0.18; // Assuming 18% GST
  const totalPrice = grossTotal + gst;

  return (
    <div className="bg-purple-100 text-black min-h-screen py-12">
      <div className="container mx-auto px-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Typography variant="h5" className="mb-4">
              No Product in Your Cart
            </Typography>
            <Link to="/products" className="text-lg underline">
              View Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap">
            <div className="w-3/4 pr-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center border-b border-purple-500 pb-4">
                  <p className="font-bold text-xl">Product</p>
                  <div>  
                    {/*  Quantity ko thoda left khiskana tha isliye div use kiya fir margin di ... but it is not responsive  */}
                  <p className="font-bold text-xl ml-32 ">Quantity</p>
                  </div>
                  <p className="font-bold text-xl">Subtotal</p>
                </div>
                {cartItems.map((item) => (
                  <div
                    className="flex justify-between items-center border-b border-purple-500 py-4"
                    key={item.product}
                  >
                    <CartItemCard item={item} className="" />
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-purple-500 text-white px-2 py-1 rounded "
                        onClick={() => decreaseQuantity(item.product, item.quantity)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="w-12 text-center border border-gray-300"
                      />
                      <button
                        className="bg-purple-500 text-white px-2 py-1 rounded"
                        onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold text-lg">
                      ₹{item.price * item.quantity}
                    </p>
                    {/* <DeleteIcon
                      className="cursor-pointer text-red-600"
                      onClick={() => deleteCartItems(item.product)}
                    /> */}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/4 pl-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="font-bold text-xl text-center mb-4">Bill Details</p>
                <div className="flex justify-between border-b border-black items-center mb-2 font-bold">
                  <span>Product</span>
                  <span>Quantity</span>
                  <span>Subtotal</span>
                </div>
                
                {cartItems.map((item) => (
                  <div className="flex justify-between items-center  mb-2" key={item.product}>
                    <span className=" max-w-12">{item.name}</span>
                    <span>{item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                    
                  </div>
                  
                ))}
                <div className="flex justify-between font-bold border-t  border-black pt-2">
                  <span>Gross Total:</span>
                  <span>₹{grossTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>GST (18%):</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl border-black border-t pt-2">
                  <span>Total:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="mt-4 text-center">
                  <button
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                    onClick={checkoutHandler}
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
