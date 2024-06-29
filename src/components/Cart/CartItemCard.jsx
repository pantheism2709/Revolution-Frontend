import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";

import { removeItemsFromCart } from "../../redux/slices/cartSlices";

const CartItemCard = ({ item }) => {

  const dispatch=useDispatch();

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  return (
    <div className="flex items-center  py-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 object-cover rounded-lg mr-4"
      />
      <div className="flex flex-col justify-between">
        <div>
          <Link
            to={`/product/${item.product}`}
            className="text-lg font-bold text-purple-900 hover:underline"
          >
            {item.name}
          </Link>
          <p className="text-gray-600">{`Price: ₹${item.price}`}</p>
        </div>
        <DeleteIcon
          className="cursor-pointer text-red-600"
          onClick={() => deleteCartItems(item.product)}
        />
      </div>
    </div>
  );
};

export default CartItemCard;
