import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import {
  productsReducer,
  newProductReducer,
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  productReviewsReducer,
  reviewReducer
} from './slices/productSlices';

import cartReducer from './slices/cartSlices'; // Import the cartSlice
import orderReducer from './slices/orderSlices'; // Import the cartSlice



export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    cart: cartReducer, // Add cartReducer to the root reducer
    // Add other reducers as needed

    order: orderReducer,
    
  },
});

