// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div className="loader-cube relative w-16 h-16 transform rotate-45">
        <div className="cube-face cube-front"></div>
        <div className="cube-face cube-back"></div>
        <div className="cube-face cube-left"></div>
        <div className="cube-face cube-right"></div>
        <div className="cube-face cube-top"></div>
        <div className="cube-face cube-bottom"></div>
      </div>
    </div>
  );
};

export default Loader;
