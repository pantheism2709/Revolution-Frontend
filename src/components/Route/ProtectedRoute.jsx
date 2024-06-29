import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Set a timeout to delay the execution of the checks
    const timer = setTimeout(() => {
      console.log(isLoading, isAuthenticated, user);

      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      if (isAdmin && user.role !== "admin") {
        navigate("/login");
        return;
      }
    }, 50); // Delay of 1 second (1000 milliseconds)  fso that states got updated properly.. because previously i faced issue that states got updated correctly after some millisecond

    // Clean up the timeout if the component unmounts or if dependencies change
    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, user, isAdmin, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
