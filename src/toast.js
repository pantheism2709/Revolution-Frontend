import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



export const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
    });
  };
  
  export const notifyError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
    });
  };
  
  export const notifyWarning = (message) => {
    toast.warn(message, {
      position: "top-center",
      autoClose: 3000,
    });
  };
  
  export const notifyInfo = (message) => {
    toast.info(message, {
      position: "top-center",
      autoClose: 3000,
    });
  };
  
  export const notifyCustom = (message) => {
    toast(message, {
      position: "top-center",
      className: 'foo-bar',
      autoClose: 3000,
    });
  };

  
