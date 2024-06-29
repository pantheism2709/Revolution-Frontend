import React, { useEffect, Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton ,CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
  resetDelete,
  resetUpdate,
} from "../../redux/slices/authSlices";
import { notifyError, notifySuccess } from "../../toast";



const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users, isgetAllUsersLoading } = useSelector(
    (state) => state.auth
  );
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.auth);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      notifySuccess(message);
      navigate("/admin/users");
      dispatch(resetDelete());
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, message, navigate]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) =>
        params.value === "admin" ? "text-green-500" : "text-red-500",
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/user/${params.row.id}`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            color="secondary"
            onClick={() => deleteUserHandler(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Fragment>
      ),
    },
  ];

  const rows =
    users?.map((user) => ({
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
    })) || [];

  if (isgetAllUsersLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );

  return (
    <Fragment>
      {/* <MetaData title="ALL USERS - Admin" /> */}
      <div className="flex min-h-screen bg-white">
        <SideBar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-6">All Users</h1>
          {users && users.length > 0 ? (
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
            <h1 className="text-xl text-purple-800">No Users Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
