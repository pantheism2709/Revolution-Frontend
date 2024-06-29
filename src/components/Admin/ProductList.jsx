import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearProductsErrors,
  clearProductErrors,
  getAdminProduct,
  deleteProduct
} from "../../redux/slices/productSlices";
import { Link, useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";

import {notifySuccess,notifyError} from "../../toast"

import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import { resetDelete } from "../../redux/slices/authSlices";
// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
//   const alert = useAlert();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted ,loading } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearProductsErrors());
    }

    if (deleteError) {
      notifyError(deleteError);
      dispatch(clearProductErrors());
    }

    if (isDeleted) {
      notifyError("Product Deleted Successfully");
      navigate("/admin/products");
      dispatch(resetDelete());
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
    { field: "price", headerName: "Price", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/product/${params.id}`}>
            <IconButton>
              <EditIcon className="text-purple-500" />
            </IconButton>
          </Link>
          <IconButton onClick={() => deleteProductHandler(params.id)}>
            <DeleteIcon className="text-red-500" />
          </IconButton>
        </Fragment>
      ),
    },
  ];

  const rows = products?.map((item) => ({
    id: item._id,
    stock: item.Stock,
    price: item.price,
    name: item.name,
  })) || [];

  if(loading)
    return <Loader/>;

  return (
    <Fragment>
      <div className="dashboard flex">
        <SideBar />
        <div className="productListContainer flex flex-col w-full p-6 bg-white">
          <h1 className="text-2xl font-bold text-purple-700 mb-4 text-center">
            ALL PRODUCTS
          </h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="productListTable"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
