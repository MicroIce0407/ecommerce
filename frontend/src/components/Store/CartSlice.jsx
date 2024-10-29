import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
import axios from "axios";
import Decimal from "decimal.js";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: backendUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getUserId = () => localStorage.getItem("userId");

const initialState = {
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,
};

const handleError = (error, thunkAPI) => {
  if (error.response && error.response.status === 401) {
    thunkAPI.dispatch(logout());
    return thunkAPI.rejectWithValue("Token expired. Please log in again.");
  } else {
    return thunkAPI.rejectWithValue(
      error.response?.data || "Something went wrong"
    );
  }
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    const userId = getUserId();
    try {
      const response = await axiosInstance.get(`/api/cart/${userId}`);
      return response.data.items;
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (product, thunkAPI) => {
    const userId = getUserId();
    const productId = product._id;
    const price = product.price;

    try {
      await axiosInstance.post(`/api/cart/add`, {
        userId,
        productId,
        quantity: 1,
        price,
      });
      return product;
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (productId, thunkAPI) => {
    const userId = getUserId();

    try {
      await axiosInstance.post(`/api/cart/remove`, {
        userId,
        productId,
        quantity: 1,
      });
      return productId;
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    const userId = getUserId();

    try {
      await axiosInstance.delete(`/api/cart/clear`, {
        data: { userId },
      });
      return;
    } catch (error) {
      return handleError(error, thunkAPI);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        state.totalPrice = action.payload.reduce((total, item) => {
          return new Decimal(total)
            .plus(new Decimal(item.totalPrice))
            .toNumber();
        }, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
        state.totalPrice = 0;
      })

      .addCase(addItemToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItem = state.items.find(
          (item) => item.productId._id === newItem._id
        );

        if (!existingItem) {
          state.items.push({
            productId: { ...newItem },
            quantity: 1,
            totalPrice: newItem.price,
          });
        } else {
          existingItem.quantity++;
          existingItem.totalPrice = new Decimal(existingItem.totalPrice)
            .plus(new Decimal(newItem.price))
            .toNumber();
        }

        state.totalPrice = new Decimal(state.totalPrice)
          .plus(new Decimal(newItem.price))
          .toNumber();
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const id = action.payload;
        const existingItem = state.items.find(
          (item) => item.productId._id === id
        );

        if (existingItem) {
          if (existingItem.quantity === 1) {
            state.items = state.items.filter(
              (item) => item.productId._id !== id
            );
          } else {
            existingItem.quantity--;
            existingItem.totalPrice = new Decimal(existingItem.totalPrice)
              .minus(new Decimal(existingItem.productId.price))
              .toNumber();
          }

          state.totalPrice = new Decimal(state.totalPrice)
            .minus(new Decimal(existingItem.productId.price))
            .toNumber();
        }
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalPrice = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
