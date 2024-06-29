import { Rating } from "@mui/material";
import React from "react";
import DummyProfile from "../../assets/DummyProfile.png";



const ReviewCard = ({ review }) => {

    // console.log(review)

    
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="flex flex-col items-center bg-purple-100 shadow-2xl rounded-lg p-4 m-4 w-72">
      <img
        className="w-16 h-16 rounded-full  border-purple-600"
        src={DummyProfile}
        alt="User"
      /> 
      <p className="mt-2 text-lg font-semibold text-purple-800 ">{review.name}</p>
      <Rating {...options} />
      <span className="mt-2 text-sm text-gray-600">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
