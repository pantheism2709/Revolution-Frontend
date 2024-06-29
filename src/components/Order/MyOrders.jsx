import React, { useEffect, Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../redux/slices/orderSlices";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";

import { notifyError,notifySuccess } from "../../toast";
import Typography from "@mui/material/Typography";
// import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.order);
  const { user, isLoading } = useSelector((state) => state.auth);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150, flex: 0.5,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "text-green-600" : "text-red-600",
    },
    {
      field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.3,
    },
    {
      field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.row.id}`} className="text-blue-500 hover:text-blue-700">
          <LaunchIcon />
        </Link>
      ),
    },
  ];

  // console.log(user)

  const rows = orders ? orders.map((order) => ({
    id: order._id,
    status: order.orderStatus,
    itemsQty: order.orderItems.length,
    amount: order.totalPrice,
  })) : [];

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {/* <MetaData title={`${user.name} - Orders`} /> */}
      {loading || isLoading ? (
        <Loader />
      ) : ( user &&
        <div className="w-full min-h-screen bg-gray-100 p-8">
          <Typography variant="h4" className="text-center mb-4">
            {user.name}'s Orders
          </Typography>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              className="myOrdersTable"
              
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
