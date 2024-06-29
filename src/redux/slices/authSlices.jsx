import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';






// Load User
export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Update Profile
export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    if (userData.avatar && userData.avatar[0]) {
      formData.append('avatar', userData.avatar[0]);
    }

    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/me/update`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Login User
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/login`, userData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Register User
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    if (userData.profilePic && userData.profilePic[0]) {
      formData.append('avatar', userData.profilePic[0]);
    }

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/register`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Logout User
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/logout`, { withCredentials: true });
    return true; // Indicate successful logout
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Forgot Password
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/password/forgot`, email, {
      headers: { 'Content-Type': 'application/json' },
      'Frontend-URL': window.location.origin,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update Password
export const updatePassword =createAsyncThunk ('auth/updatePassword',async(formData,{rejectWithValue}) => {
  try {
   

    const config = { headers: { "Content-Type": "application/json" },withCredentials:true };

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/v1/password/update`,
      formData,
      config
    );

    return response.data;



    // dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    
      return  rejectWithValue(error.response.data)
    }
  });


// Reset Password
export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, passwords }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/password/reset/${token}`, passwords, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get All Users
export const getAllUsers = createAsyncThunk('auth/getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/users`, { withCredentials: true });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get User Details
export const getUserDetails = createAsyncThunk('auth/getUserDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/user/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update User
export const updateUser = createAsyncThunk('auth/updateUser', async ({ id, userData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/admin/user/${id}`, userData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Delete User
export const deleteUser = createAsyncThunk('auth/deleteUser', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/admin/user/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    users: [], // For handling multiple users
    userDetails: null, // For handling single user details
    isAuthenticated: false,
    isLoading: false,
    isgetAllUsersLoading:false,
    isUserDetailsLoading:false, // iam  using this because using a single loading for every action is causing infinite loading ... so I dont know whether Iam doing right or wrong but iam using different loading state
    isUpdated: false,
    isDeleted: false,
    success: null,
    message: null,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.success = null;
      state.message = null;
    },
    resetUpdate: (state) => {
      state.isUpdated = false;
    },
    resetDelete: (state) => {
      state.isDeleted = false;
    },
    resetSuccess:(state)=>{
      state.success=null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isUpdated = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Clear the cookie
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.isLoading = true;
        
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload)
        state.success = action.payload.success;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isgetAllUsersLoading = true;
        state.error=null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isgetAllUsersLoading = false;
        state.error=null;
        
        state.users = action.payload.users;
        
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isgetAllUsersLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.isUserDetailsLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isUserDetailsLoading = false;
        // console.log(action.payload)
        state.userDetails = action.payload.user;
        // console.log(state.userDetails)
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isUserDetailsLoading = false;
        state.error = action.payload.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isDeleted = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearErrors, clearMessages, resetUpdate, resetDelete ,resetSuccess} = authSlice.actions;
export default authSlice.reducer;
