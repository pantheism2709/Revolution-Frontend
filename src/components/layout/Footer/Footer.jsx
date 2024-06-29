import React from 'react';
import playStore from '../../../assets/playstore.png';
import appStore from '../../../assets/Appstore.png';

const Footer = () => {
  return (
    <footer className="bg-purple-800 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Download App Section */}
        <div className="leftFooter">
          <h4 className="text-xl font-semibold mb-4">DOWNLOAD OUR APP</h4>
          <p className="text-lg mb-4">Download App for Android and IOS mobile phone</p>
          <div className="flex space-x-4">
            <img src={playStore} alt="playstore" className="w-32" />
            <img src={appStore} alt="Appstore" className="w-32" />
          </div>
        </div>

        {/* Company Information Section */}
        <div className="midFooter text-center">
          <h1 className="text-3xl font-bold mb-4">Revolution</h1>
          <p className="text-lg mb-4">High Quality is our first priority</p>
          <p className="text-lg">&copy; 2024 Your Company. All Rights Reserved.</p>
        </div>

        {/* Social Media Links Section */}
        <div className="rightFooter text-center md:text-right">
          <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
          <div className="flex flex-col space-y-2">
            <a href="http://instagram.com/sm2709" className="text-lg hover:underline">Instagram</a>
            {/* <a href="http://youtube.com/6packprogramemr" className="text-lg hover:underline">YouTube</a> */}
            <a href="http://instagram.com/sm2709" className="text-lg hover:underline">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
