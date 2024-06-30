import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { notifyError, notifySuccess } from "../../toast";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearProductErrors } from "../../redux/slices/productSlices";

import { useParams } from "react-router-dom";

const Products = () => {
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Books",
    "Toys",
    "Others",
  ];

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [rating, setRating] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const {keyword} = useParams();

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearProductErrors());
    }

    dispatch(
      getProduct({
        keyword,
        currentPage,
        priceRange,
        rating,
        selectedCategory,
      })
    );
  }, [dispatch, keyword, currentPage, priceRange, rating, selectedCategory, error]);

  const productsPerPage = 8;

  const totalPages = Math.ceil(filteredProductsCount / productsPerPage);

  return (
    <div className="flex bg-purple-50">
      <div className="w-1/5 p-4  h-screen overflow-auto border-r bg-white shadow-2xl">
        {/* Filter Section */}
        <div className="mb-4">
          <h2 className="text-lg font-bold">Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category} className="my-2">
                <button
                  className={`px-4 py-2 w-full text-left rounded-full ${
                    selectedCategory === category ? "bg-purple-300" : ""
                  } ${
                    selectedCategory === "" && category === "All"
                      ? "bg-purple-300"
                      : ""
                  }`}
                  onClick={() => {
                    if (category !== "All") setSelectedCategory(category);
                    else setSelectedCategory("");
                    setCurrentPage(1); // Reset to first page when filter changes
                  }}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Price Range</h2>
          <input
            type="range"
            color="purple"
            min="0"
            max="25000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}

            className="accent"
          />
          <span>{priceRange[1]}</span>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Rating</h2>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(+e.target.value)}
            className="accent"
          />
          <span>{rating}</span>
        </div>
      </div>
      <div
        className="w-5/6 p-4 overflow-auto"
        // style={{ marginLeft: "25%" }}
      >
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
