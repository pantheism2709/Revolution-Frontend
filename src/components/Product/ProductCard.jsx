import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { addItemsToCart } from "../../redux/slices/cartSlices";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notifySuccess } from "../../toast";

const ProductCard = ({ product }) => {

  const dispatch=useDispatch();

  const clickHandler=()=>{
    dispatch(addItemsToCart(product._id,1));
    notifySuccess("Item added to cart");
  }

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const starIcons = [];
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-500" />);
    }
    if (hasHalfStar) {
      starIcons.push(<FontAwesomeIcon key={`half-${fullStars}`} icon={faStarHalfAlt} className="text-yellow-500" />);
    }

    const emptyStars = 5 - starIcons.length;
    for (let i = 0; i < emptyStars; i++) {
      starIcons.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-gray-300" />);
    }

    return starIcons;
  };

  return (
    <div className=" m-2 w-60 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl transition-transform">
     
        <img
          src={product.images[0].url} // Assuming there's at least one image in images array
          alt="Product"
          className=" h-fit w-fit rounded-t-xl"
        />
        <div className="px-4 py-3 w-60">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {product.category}
          </span>
          <Link to={`/product/${product._id}`}>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {product.name}
          </p>
          </Link>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ₹{product.price}
            </p>
          {/* below can be used for percentage discount */}
            {product.price && (
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">
                  ₹{product.price+40}
                </p>
              </del>
            )}
            <div className="ml-auto cursor-pointer hover:scale-120 hover:shadow-full  hover:rounded-xl min-w-max"
             onClick={clickHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
          </div>
          {/* Rating Section */}
          <div className="flex items-center mt-2">
            {renderStars(product.ratings)}
            <span className="ml-2 text-sm text-gray-600">({product.numOfReviews})</span>
          </div>
        </div>
     
    </div>
  );
};

export default ProductCard;
