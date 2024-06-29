import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearReviewErrors, getAllReviews, deleteReviews, resetReview } from "../../redux/slices/productSlices";
import { Button, IconButton } from "@mui/material";
import { notifyError, notifySuccess } from "../../toast";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector((state) => state.review);
  const { error, reviews, loading } = useSelector((state) => state.productReviews);
  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews({ reviewId, productId }));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      notifyError(error);
      dispatch(clearReviewErrors());
    }
    if (deleteError) {
      notifyError(deleteError);
      dispatch(clearReviewErrors());
    }
    if (isDeleted) {
      notifySuccess("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch(resetReview());
    }
  }, [dispatch, error, deleteError, isDeleted, navigate, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => (params.value >= 3 ? "text-green-500" : "text-red-500"),
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => deleteReviewHandler(params.row.id)} size="small">
          <DeleteIcon className="text-red-500"/>
        </IconButton>
      ),
    },
  ];

  const rows = reviews?.map((item) => ({
    id: item._id,
    rating: item.rating,
    comment: item.comment,
    user: item.name,
  })) || [];

  return (
    <Fragment>
      <div className="flex min-h-screen bg-white">
        <SideBar />
        <div className="flex-1 p-8">
          <form className="mb-8 flex flex-col items-center" onSubmit={productReviewsSubmitHandler}>
            <h1 className="text-3xl font-bold text-purple-800 mb-6">All Reviews</h1>
            <div className="flex items-center mb-4 w-1/2">
              <StarIcon className="mr-2 text-purple-600" />
              <input
                type="text"
                placeholder="Product ID"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading || productId === ""}
              className="bg-purple-600 hover:bg-purple-700 text-white mt-2"
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
                className="bg-white"
              />
            </div>
          ) : (
            <h1 className="text-xl text-purple-800">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
