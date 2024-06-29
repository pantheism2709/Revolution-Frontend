import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

let initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.product === item.product);

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeCartItem(state, action) {
      state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
    },
    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
    clearCart(state) {
      state.cartItems = [];
    }
  },
});

export const { addToCart, removeCartItem, saveShippingInfo, clearCart } = cartSlice.actions;

// Thunk for adding items to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/v1/product/${id}`);

    dispatch(
      addToCart({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      })
    );

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

// Thunk for removing items from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch(removeCartItem(id));
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// Thunk for saving shipping information
export const saveShippingInfoToStore = (data) => async (dispatch, getState) => {
  try {
    dispatch(saveShippingInfo(data));
    localStorage.setItem('shippingInfo', JSON.stringify(getState().cart.shippingInfo));
  } catch (error) {
    console.error('Error saving shipping info:', error);
  }
};

// Thunk for clearing the cart
export const clearCartItems = () => (dispatch, getState) => {
  try {
    dispatch(clearCart());
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.error('Error clearing cart items:', error);
  }
};

export default cartSlice.reducer;
