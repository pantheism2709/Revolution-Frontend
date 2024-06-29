import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlices';
import { notifySuccess, notifyError } from '../../toast';

function Register() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        notifySuccess('Registration successful!');
        reset();
        navigate('/');
      })
      .catch((err) => {
        notifyError(err.message || 'Registration failed!');
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-100">
      <form onSubmit={handleSubmit(onSubmit)} className="square-form bg-white p-8 rounded-lg shadow-lg  w-full">
        <h2 className="text-2xl font-bold mb-6 text-purple-800">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-purple-800 mb-2 px-2">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            className="form-input w-full p-2 border border-purple-800 rounded-full"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-purple-800 mb-2 px-2">Email</label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            className="form-input w-full p-2 border border-purple-800 rounded-full"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-purple-800 mb-2 px-2">Password</label>
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            className="form-input w-full p-2 border border-purple-800 rounded-full"
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-purple-800 mb-2 px-2">Profile Picture</label>
          <input
            {...register('profilePic')}
            type="file"
            className="form-input w-full p-2 border border-purple-800 rounded-full"
          />
        </div>
        <button
          type="submit"
          className="form-button w-full bg-purple-800 text-white p-2 rounded-full hover:bg-purple-600 transition duration-300"
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default Register;
