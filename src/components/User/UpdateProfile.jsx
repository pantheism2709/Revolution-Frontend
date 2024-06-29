import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetUpdate } from '../../redux/slices/authSlices';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { notifySuccess, notifyError } from '../../toast';
import Loader from '../layout/Loader/Loader';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error, isUpdated } = useSelector((state) => state.auth);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      avatar: null,
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        setValue('name', user.name);
        setValue('email', user.email);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [user, setValue]);

  useEffect(() => {
    if (error) {
      notifyError(error);
    }
    if (isUpdated) {
      notifySuccess("User Updated");
      dispatch(resetUpdate()); // Dispatch the action here
      navigate('/profile'); // Navigate to the profile page or wherever appropriate
    }
  }, [error, isUpdated, dispatch, navigate]);

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full square-form">
        <h1 className="text-4xl font-bold mb-6 text-purple-800 text-center">Edit Profile</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              {...register('name', { required: 'Name is required' })}
              className="form-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              {...register('email', { 
                required: 'Email is required', 
                pattern: { 
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                  message: 'Enter a valid email' 
                } 
              })}
              className="form-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="avatar">
              Profile Picture
            </label>
            <input
              type="file"
              name="avatar"
              {...register('avatar', { required: 'Profile picture is required' })}
              className="form-input w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            />
            {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="form-button bg-purple-800 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
