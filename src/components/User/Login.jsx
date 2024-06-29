import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlices';
import { notifySuccess, notifyError } from '../../toast';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
   
    if (user) {
      notifySuccess('Login successful!');
      navigate('/');
    }
    if (error) {
      notifyError(error.message || 'Login failed!');
    }
  }, [user, error, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-100">
      <form onSubmit={handleSubmit(onSubmit)} className="square-form bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-purple-800">Login</h2>
        <div className="mb-4">
          <label className="block text-purple-800 mb-2 px-2">Email</label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            className="form-input w-full p-2 border border-purple-800 rounded-full"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-purple-800 mb-2 px-2">Password</label>
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            className="form-input w-full p-2 border border-purple-800 rounded-full"
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="form-input form-button w-full bg-purple-800 text-white p-2 rounded-full hover:bg-purple-600 transition duration-300"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        <div className="text-center mt-4">
          <Link to="/password/forgot" className="text-purple-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
