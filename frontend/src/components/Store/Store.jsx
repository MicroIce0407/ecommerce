import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import searchReducer from "./SearchSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    auth: authReducer,
  },
});
