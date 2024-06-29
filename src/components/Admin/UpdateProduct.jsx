import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { clearProductErrors, updateProduct, getProductDetails, resetUpdate } from '../../redux/slices/productSlices';
import { notifySuccess, notifyError } from '../../toast';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from './Sidebar';
import Loader from '../layout/Loader/Loader';

const categories = ["Electronics", "Clothing", "Books", "Toys", "Others"];

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('category', product.category);
      setValue('Stock', product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      notifyError(error);
      dispatch(clearProductErrors());
    }
    if (updateError) {
      notifyError(updateError);
      dispatch(clearProductErrors());
    }
    if (isUpdated) {
      notifySuccess("Product Updated Successfully");
      navigate("/admin/products");
      dispatch(resetUpdate());
    }
  }, [dispatch, error, navigate, isUpdated, productId, product, updateError, setValue]);

  const onSubmit = (data) => {
    const myForm = new FormData();
    myForm.set('name', data.name);
    myForm.set('price', data.price);
    myForm.set('description', data.description);
    myForm.set('category', data.category);
    myForm.set('Stock', data.Stock);
    
    images.forEach((image) => {
      myForm.append('images', image);
    });

    dispatch(updateProduct({ productId, myForm }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  if(loading)
    return <Loader/>;

  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="flex-1 p-8">
        <form
          className="max-w-lg mx-auto p-8 bg-purple-50 shadow-md rounded-lg"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-bold text-purple-800 mb-6">Update Product</h1>

          <div className="mb-4">
            <label className="block text-purple-800 mb-2 px-2">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              className="form-input w-full p-2 border border-purple-800 rounded-full"
              {...register('name', { required: 'Product name is required' })}
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-purple-800 mb-2 px-2">Price</label>
            <input
              type="number"
              placeholder="Price"
              className="form-input w-full p-2 border border-purple-800 rounded-full"
              {...register('price', { required: 'Price is required' })}
            />
            {errors.price && <p className="text-red-600">{errors.price.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-purple-800 mb-2 px-2">Product Description</label>
            <textarea
              placeholder="Product Description"
              className="form-input w-full p-2 border border-purple-800 rounded-full"
              {...register('description', { required: 'Description is required' })}
            ></textarea>
            {errors.description && <p className="text-red-600">{errors.description.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-purple-800 mb-2 px-2">Category</label>
            <select
              className="form-input w-full p-2 border border-purple-800 rounded-full bg-white shadow hover:shadow-lg transition-shadow duration-300"
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-600">{errors.category.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-purple-800 mb-2 px-2">Stock</label>
            <input
              type="number"
              placeholder="Stock"
              className="form-input w-full p-2 border border-purple-800 rounded-full"
              {...register('Stock', { required: 'Stock is required' })}
            />
            {errors.Stock && <p className="text-red-600">{errors.Stock.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-purple-800 mb-2 px-2">Product Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="form-input w-full p-2 border border-purple-800 rounded-full"
            />
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            {oldImages && oldImages.map((image, index) => (
              <div key={index} className="relative">
                <img src={image.url} alt="Old Product Preview" className="w-24 h-24 object-cover rounded-full" />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            {imagesPreview.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt="Product Preview" className="w-24 h-24 object-cover rounded-full" />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="form-button w-full bg-purple-800 text-white p-2 rounded-full hover:bg-purple-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
