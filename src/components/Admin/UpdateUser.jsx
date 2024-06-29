import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { MailOutline as MailOutlineIcon, Person as PersonIcon, VerifiedUser as VerifiedUserIcon } from "@mui/icons-material";
import SideBar from "./Sidebar";
import { getUserDetails, updateUser, clearErrors, resetUpdate } from "../../redux/slices/authSlices";
import { notifyError, notifySuccess } from "../../toast";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const { isLoading, error, userDetails } = useSelector((state) => state.auth);
  const { isLoading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!userDetails || userDetails._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(userDetails.name || "");
      setEmail(userDetails.email || "");
      setRole(userDetails.role || "");
    }

    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      notifyError(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      notifySuccess("User Updated Successfully");
      navigate("/admin/users");
      dispatch(resetUpdate());
    }
  }, [dispatch, error, updateError, isUpdated, userDetails, userId, navigate]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const userData = { name, email, role };
    dispatch(updateUser({ id: userId, userData }));
  };

  return (
    <Fragment>
      <div className="flex min-h-screen bg-white">
        <SideBar />
        <div className="flex-1 p-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <CircularProgress />
            </div>
          ) : (
            <form className="max-w-lg mx-auto p-8 bg-purple-50 shadow-md rounded-lg" onSubmit={updateUserSubmitHandler}>
             <div className=" flex flex-col items-center">
              <h1 className="text-3xl font-bold text-purple-800 mb-6">Update User</h1>
              </div>
              <div className="mb-4 flex items-center justify-center">
                <PersonIcon className="text-purple-600 mr-2" />
                <label className="block text-purple-800 mr-2  px-2">Name</label>
                <input
                  type="text"
                  className="form-input w-full p-2 border border-purple-800 rounded-full"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4 flex items-center justify-center">
                <MailOutlineIcon className="text-purple-600 mr-2" />
                <label className="block text-purple-800 mr-2  px-2">Email</label>
                <input
                  type="email"
                  className="form-input w-full p-2 border border-purple-800 rounded-full"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6 flex items-center justify-center">
                <VerifiedUserIcon className="text-purple-600 mr-2 " />
                <label className="block text-purple-800 mr-2 px-2">Role</label>
                {/* <FormControl fullWidth className="border border-purple-800 rounded-full"> */}
                {/* <div className="rounded-full w-full"> */}
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full p-2 rounded-full outline-none"
                  >
                    <option value=""><em>Choose Role</em></option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  {/* </div> */}
                {/* </FormControl> */}
              </div>
              <button
                type="submit"
                variant="contained"
                color="primary"
                disabled={updateLoading || role === ""}
                className=" form-button w-full  bg-purple-500 text-white p-2 rounded-full hover:bg-purple-700 transition duration-300"
              >
                {updateLoading ? <CircularProgress size={24} /> : "Update"}
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
