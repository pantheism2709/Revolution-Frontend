import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, resetNewProduct, clearNewProductErrors } from '../../redux/slices/productSlices';
import { useForm } from 'react-hook-form';
import { notifySuccess, notifyError } from '../../toast';
import Loader from '../layout/Loader/Loader';



const categories = ["Electronics", "Clothing", "Books", "Toys", "Others"];

const NewProduct = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.newProduct);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (success) {
      notifySuccess('Product created successfully!');
      dispatch(resetNewProduct());
      reset();
      setImages([]);
      setImagePreviews([]);
    }

    if (error) {
      notifyError(error);
      dispatch(clearNewProductErrors());
    }
  }, [dispatch, success, error, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('Stock', data.Stock);

    images.forEach((image) => {
      formData.append('images', image);
    });

    dispatch(createProduct(formData));
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newFiles]);

    const imagePreviewsArray = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...imagePreviewsArray]);
  };

  if (loading) return <Loader />;

  return (
    <div className="flex justify-center min-h-screen bg-purple-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full my-3 max-w-lg square-form"
      >
        <h2 className="text-2xl font-bold mb-6 text-purple-800">Create New Product</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-purple-800 mb-2 px-2">Product Name</label>
            <input
              {...register('name', { required: 'Product name is required' })}
              type="text"
              className="w-full p-2 border border-purple-800 rounded-full"
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-purple-800 mb-2 px-2">Price</label>
            <input
              {...register('price', { required: 'Price is required' })}
              type="number"
              className="w-full p-2 border border-purple-800 rounded-full"
            />
            {errors.price && <p className="text-red-600">{errors.price.message}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-purple-800 mb-2 px-2">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="w-full p-2 border border-purple-800 rounded-lg"
          ></textarea>
          {errors.description && <p className="text-red-600">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-purple-800 mb-2 px-2">Category</label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full p-4 border border-purple-800 rounded-full"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-600">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-purple-800 mb-2 px-2">Stock</label>
            <input
              {...register('Stock', { required: 'Stock is required' })}
              type="number"
              className="w-full p-2 border border-purple-800 rounded-full"
            />
            {errors.Stock && <p className="text-red-600">{errors.Stock.message}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-purple-800 mb-2 px-2">Images</label>
          <input
            {...register('images')}
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border border-purple-800 rounded-full"
          />
          <div className="flex flex-wrap mt-4">
            {imagePreviews.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" className="w-20 h-20 object-cover mr-2 mb-2 rounded-lg" />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className=" form-button w-full  bg-purple-800 text-white p-2 rounded-full hover:bg-purple-600 transition duration-300"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
