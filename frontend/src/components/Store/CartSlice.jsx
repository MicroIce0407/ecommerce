import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Decimal from "decimal.js";

// const storedCart = JSON.parse(localStorage.getItem("cartState"));

const initialState = {
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,
};

// Thunk 用於從後端獲取購物車數據
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${userId}`
      );
      return response.data.items; // 返回購物車商品數據
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching cart"
      );
    }
  }
);

// 添加商品至購物車的 Thunk
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (product, thunkAPI) => {
    const userId = localStorage.getItem("userId");
    const productId = product._id;
    const price = product.price;

    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        productId,
        quantity: 1,
        price,
      });
      return product; // 返回商品詳細信息，用於更新狀態
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding item to cart"
      );
    }
  }
);

// 移除商品的 Thunk
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (productId, thunkAPI) => {
    const userId = localStorage.getItem("userId");

    try {
      await axios.post("http://localhost:5000/api/cart/remove", {
        userId,
        productId,
        quantity: 1,
      });
      return productId; // 返回商品 ID，用於從狀態中移除
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error removing item from cart"
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    const userId = localStorage.getItem("userId");

    try {
      await axios.delete("http://localhost:5000/api/cart/clear", {
        data: { userId },
      });
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error clearing cart"
      );
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
        state.items = action.payload;
        state.totalPrice = action.payload.reduce((total, item) => {
          return new Decimal(total)
            .plus(new Decimal(item.totalPrice))
            .toNumber();
        }, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 新增 addItemToCart 的額外 reducers
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

      // 新增 removeItemFromCart 的額外 reducers
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

      // 新增 clearCart 的額外 reducers
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
