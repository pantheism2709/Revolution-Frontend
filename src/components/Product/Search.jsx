import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
     <div className=" min-h-screen">
      <form
        className="flex items-center justify-center mt-8"
        onSubmit={searchSubmitHandler}
      >
        <input
          type="text"
          placeholder="Search a Product ..."
          className="w-64 p-2 border border-purple-400 rounded-md focus:outline-none focus:border-purple-600"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
        >
          Search
        </button>
      </form>
      </div>
    </>
  );
};

export default Search;
