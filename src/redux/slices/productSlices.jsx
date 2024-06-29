import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks

const apiUrl=import.meta.env.VITE_API_URL

// Get All Products
export const getProduct = createAsyncThunk(
  'products/getAll',
  async ({ keyword = "", currentPage = 1, priceRange = [0, 25000], selectedCategory, rating = 0 }, { rejectWithValue }) => {

    

    try {
      let link = `${apiUrl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte]=${rating}`;
      if (selectedCategory) {

       

        link = `${apiUrl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&category=${selectedCategory}&ratings[gte]=${rating}`;
      }

     
      const { data } = await axios.get(link);

     
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get All Products For Admin
export const getAdminProduct = createAsyncThunk(
  'products/getAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/admin/products`,{
        withCredentials:true
      });
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create Product
export const    createProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials:true
        
      };

      for (let [key, value] of productData.entries()) {
        if (value instanceof File) {
            // If the value is a File (such as an image), log its details
            // console.log(`${key}: ${value.name}, ${value.size} bytes, ${value.type}`);
            
            // Create a URL for the image file and display it
            const url = URL.createObjectURL(value);
            const img = document.createElement('img');
            img.src = url;
            img.alt = key;
            img.style.maxWidth = '200px';  // Limit the displayed image size
            document.body.appendChild(img);
        } else if (Array.isArray(value)) {
            // If the value is an array (like multiple files), iterate over it
            value.forEach((file, index) => {
                if (file instanceof File) {
                    console.log(`${key}[${index}]: ${file.name}, ${file.size} bytes, ${file.type}`);
    
                    // Create a URL for the image file and display it
                    const url = URL.createObjectURL(file);
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = `${key}[${index}]`;
                    img.style.maxWidth = '200px';  // Limit the displayed image size
                    document.body.appendChild(img);
                }
            });
        } else {
          
        }
    }
    

      const { data } = await axios.post(`${apiUrl}/api/v1/admin/product/new`, productData, config);

      // console.log(data)

      return data;
    } catch (error) {

     

      
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update Product
// export const updateProduct = createAsyncThunk(
//   'products/update',
//   async ({ productId, myForm }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials:true
//       };
//       const { data } = await axios.put(`${apiUrl}/api/v1/admin/product/${productId}`, myForm, config);
//       return data.success;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ productId, myForm }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };

      // Debugging: log the FormData entries
      for (let [key, value] of myForm.entries()) {
        if (value instanceof File) {
          // If the value is a File (such as an image), log its details
          console.log(`${key}: ${value.name}, ${value.size} bytes, ${value.type}`);

          // Create a URL for the image file and display it
          const url = URL.createObjectURL(value);
          const img = document.createElement('img');
          img.src = url;
          img.alt = key;
          img.style.maxWidth = '200px'; // Limit the displayed image size
          document.body.appendChild(img);
        } else if (Array.isArray(value)) {
          // If the value is an array (like multiple files), iterate over it
          value.forEach((file, index) => {
            if (file instanceof File) {
              console.log(`${key}[${index}]: ${file.name}, ${file.size} bytes, ${file.type}`);

              // Create a URL for the image file and display it
              const url = URL.createObjectURL(file);
              const img = document.createElement('img');
              img.src = url;
              img.alt = `${key}[${index}]`;
              img.style.maxWidth = '200px'; // Limit the displayed image size
              document.body.appendChild(img);
            }
          });
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      // Make the PUT request to update the product
      const { data } = await axios.put(
        `${apiUrl}/api/v1/admin/product/${productId}`,
        myForm,
        config
      );

      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${apiUrl}/api/v1/admin/product/${id}`,{
        withCredentials:true
      });
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get Product Details
export const getProductDetails = createAsyncThunk(
  'products/getDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/product/${id}`);
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// New Review
export const newReview = createAsyncThunk(
  'reviews/new',
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials:true
      };
      const { data } = await axios.put(`${apiUrl}/api/v1/review`, reviewData, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get All Reviews of a Product
export const getAllReviews = createAsyncThunk(
  'reviews/getAll',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/reviews?id=${id}`,{
        withCredentials:true
      });
      return data.reviews;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete Review of a Product
export const deleteReviews = createAsyncThunk(
  'reviews/delete',
  async ({ reviewId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${apiUrl}/api/v1/reviews?id=${reviewId}&productId=${productId}`,{
        withCredentials:true
      });
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Slices

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    productsCount: 0,
    resultPerPage: 0,
    filteredProductsCount: 0,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAdminProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const newProductSlice = createSlice({
  name: 'newProduct',
  initialState: {
    product: {},
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.success = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;
      })
      .addCase(createProduct.rejected, (state, action) => {
     
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    isDeleted: false,
    isUpdated: false,
    error: null,
  },
  reducers: {
    resetDelete: (state) => {
      state.isDeleted = false;
      
    },
    resetUpdate:(state)=>{

      state.isUpdated = false;

    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const newReviewSlice = createSlice({
  name: 'newReview',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.success = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(newReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(newReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const productReviewsSlice = createSlice({
  name: 'productReviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    loading: false,
    isDeleted: false,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.isDeleted = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exporting actions and reducers

export const { clearErrors: clearProductsErrors } = productsSlice.actions;
export const { reset: resetNewProduct, clearErrors: clearNewProductErrors } = newProductSlice.actions;
export const { resetDelete,resetUpdate, clearErrors: clearProductErrors } = productSlice.actions;
export const { clearErrors: clearProductDetailsErrors } = productDetailsSlice.actions;
export const { reset: resetNewReview, clearErrors: clearNewReviewErrors } = newReviewSlice.actions;
export const { clearErrors: clearProductReviewsErrors } = productReviewsSlice.actions;
export const { reset: resetReview, clearErrors: clearReviewErrors } = reviewSlice.actions;

export const productsReducer = productsSlice.reducer;
export const newProductReducer = newProductSlice.reducer;
export const productReducer = productSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
export const newReviewReducer = newReviewSlice.reducer;
export const productReviewsReducer = productReviewsSlice.reducer;
export const reviewReducer = reviewSlice.reducer;
