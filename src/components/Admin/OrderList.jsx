import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { notifyError, notifySuccess } from "../../toast";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
  resetDeleteOrder,
} from "../../redux/slices/orderSlices";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.order);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      notifyError(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      notifySuccess("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch(resetDeleteOrder());
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted, history]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "text-green-600" : "text-red-600",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/order/${params.row.id}`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            color="secondary"
            onClick={() => deleteOrderHandler(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Fragment>
      ),
    },
  ];

  const rows = orders
    ? orders.map((order) => ({
        id: order._id,
        itemsQty: order.orderItems.length,
        amount: order.totalPrice,
        status: order.orderStatus,
      }))
    : [];

  return (
    <Fragment>
      <div className="flex">
        <SideBar />
        <div className="flex-grow p-6">
          <h1 className="text-2xl font-bold text-purple-800 mb-6">ALL ORDERS</h1>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              className="text-purple-800"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
