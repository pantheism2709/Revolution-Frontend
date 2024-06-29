import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import { loadUser ,clearErrors } from "./redux/slices/authSlices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "./components/layout/Loader/Loader";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import NewProduct from "./components/Admin/NewProduct";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import About from "./components/layout/About/About";
import Contact from "./components/layout/Contact/Contact";
import NotFound from "./components/layout/NotFound/NotFound";
import ProductDetails from "./components/Product/ProductDetails";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConifrmOrder";
import PaymentWrapper from "./components/Cart/PaymentWrapper";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import Dashboard from "./components/Admin/Dashboard";
import { getAllUsers } from "./redux/slices/authSlices";
import ProductList from "./components/Admin/ProductList";
import ProductReviews from "./components/Admin/ProductReviews";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import UpdateProduct from "./components/Admin/UpdateProduct";
import UpdatePassword from "./components/User/UpdatePassword";
import ResetPassword from "./components/User/ResetPassword";
import ForgotPassword from "./components/User/ForgotPassword";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("http://localhost:9000/api/v1/stripeapikey");
  //   setStripeApiKey(data.stripeApiKey);
  // }

  // console.log("stripeApiKey"+stripeApiKey)

  useEffect(() => {
    dispatch(loadUser());
    dispatch(clearErrors());
    // ye wala function basically dashboard.js me ana tha but waha vo infinite loading kar ra tha to ise yaha laga diya , reason ye he ki ...reason pata hi ni chla to mene socha ki application jab mount ho tab laga to ... isliye mene start me laga diya 😢
    // getStripeApiKey();

  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route exact path="/edit-profile" element={<UpdateProfile />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<Shipping />} />
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        <Route exact path="/process/payment" element={<PaymentWrapper />} />
        <Route exact path="/success" element={<OrderSuccess />} />
        <Route exact path="/orders" element={<MyOrders />} />
        <Route exact path="/order/:id" element={<OrderDetails />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/product" element={<NewProduct />} />
        </Route>
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/orders" element={<OrderList />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
        </Route>
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/products" element={<ProductList />} />
        </Route>
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/reviews" element={<ProductReviews />} />
        </Route>
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/users" element={<UsersList />} />
        </Route>
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/user/:id" element={<UpdateUser />} />
        </Route>
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>
        <Route element={<ProtectedRoute  />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>
     
          <Route path="/password/reset/:token" element={<ResetPassword />} />
      
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
