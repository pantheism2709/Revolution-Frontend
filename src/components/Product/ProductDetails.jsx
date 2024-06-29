import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { getProductDetails, newReview } from "../../redux/slices/productSlices";
import {
  clearProductDetailsErrors,
  resetNewReview,
  clearNewReviewErrors,
} from "../../redux/slices/productSlices";
import { addItemsToCart } from "../../redux/slices/cartSlices";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from "@mui/material";
import Loader from "../layout/Loader/Loader";
import { notifySuccess, notifyError } from "../../toast";
import ReviewCard from "./ReviewCard";

import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    notifySuccess("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearProductDetailsErrors());
    }

    if (reviewError) {
      notifyError(reviewError);
      dispatch(clearNewReviewErrors());
    }

    if (success) {
      notifySuccess("Review Submitted Successfully");
      dispatch(resetNewReview());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-white text-purple-800">
            <div className="flex justify-center items-center mt-auto  ">
              <div className="w-full max-w-md">
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="w-full h-64 object-cover rounded-lg shadow-xl"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </div>
            </div>

            <div>
              <div className=" flex m-2">
                <h2 className="text-2xl font-bold text-black">Name :&nbsp;</h2>
                <h2 className="text-2xl font-bold">{product.name}</h2>
                {/* <p>Product # {product._id}</p> */}
              </div>
              <hr className="border-t-1 border-gray-300" />

              <div className="flex m-2">
                <Rating {...options} />
                <span className="ml-2 mt-1 text-black">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>

              <hr className="border-t-1 border-gray-300" />

              <div className="mb-4">
                <div className="flex m-2">
                  <h2 className="text-2xl font-bold text-black">
                    Price :&nbsp;
                  </h2>
                  <h1 className="text-3xl font-bold">₹{product.price}</h1>
                </div>
                <hr className="border-t-1 border-gray-300" />
                <div className="flex items-center mt-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={decreaseQuantity}
                      className="px-3 py-1 border-r hover:bg-purple-400 hover:text-white transition duration-300"
                    >
                      -
                    </button>
                    <input
                      readOnly
                      type="number"
                      value={quantity}
                      className="w-12 text-center"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="px-3 py-1 border-l hover:bg-purple-400 hover:text-white transition duration-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={addToCartHandler}
                    disabled={product.Stock < 1}
                    className="ml-4 px-6 py-2 bg-purple-600 text-white rounded-lg shadow-xl hover:scale-105 transition duration-400 hover:shadow-2xl"
                  >
                    Add to Cart
                  </button>
                </div>

                <p className="mt-2 text-black">
                  Status:{" "}
                  <b
                    className={
                      product.Stock < 1 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <hr className="border-t-1 border-gray-300" />

              <div className="m-2">
                <h3 className="font-semibold text-black">Description:</h3>
                <p>{product.description}</p>
              </div>

              <button
                onClick={submitReviewToggle}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:scale-105 transition duration-400 hover:shadow-2xl"
              >
                Submit Review
              </button>
            </div>
          </div>

          <hr className=" border-t-1  mt-2 mx-4 border-gray-300" />

          <h3 className="text-2xl font-bold text-center my-8">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent>
              <Rating
                onChange={(e) => setRating(Number(e.target.value))}
                value={rating}
                size="large"
              />
              <textarea
                className="w-full mt-4 p-2 border rounded-lg"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div  >
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className=" text-center">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
