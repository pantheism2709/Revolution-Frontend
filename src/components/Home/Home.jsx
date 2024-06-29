import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError } from "../../toast";
import { getProduct, clearProductErrors } from "../../redux/slices/productSlices";
import ProductCard from "./ProductCard";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HomePage from "../../assets/HomePage.jpg"



function Home() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  const carouselImages = [
    HomePage,
    HomePage,
    HomePage,
    
  ];

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearProductErrors());
    }
    dispatch(getProduct({}));
  }, [dispatch, error]);

  return (
    <>
      <div className="h-screen py-10 flex justify-center items-center rounded-bottom shadow-2xl">   
        <div className="flex items-center w-full max-w-5xl px-6 ">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              Revolution
            </h2>
            <p className="text-gray-700 mb-6">
              This is a brief description of the organization. It provides some
              insight into the mission, values, or services offered by the
              organization.
            </p>
            <button className="bg-purple-800 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300 transform hover:scale-105">
              Shop Now !!
            </button>
          </div>
          <div className="flex-1">
            <Carousel
              showArrows={false}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              autoPlay={true}
              interval={3000}
              className=" rounded-full shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {carouselImages.map((src, index) => (
                <div key={index} className="h-full">
                  <img src={src} alt={`carousel-${index}`} className="object-cover h-full w-full rounded-full" />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      <div className="fancy-horizontal"></div>

      <h2 className="text-3xl font-bold text-center mb-8 font-sans">New Collection</h2>

      <div className="flex items-center justify-center min-h-screen bg-purple-100">
        <section
          id="Projects"
          className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </section>
      </div>
    </>
  );
}

export default Home;
