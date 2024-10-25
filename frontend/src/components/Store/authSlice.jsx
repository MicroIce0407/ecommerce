import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.userId = action.payload.userId;

      localStorage.setItem("token", state.token);
      localStorage.setItem("username", state.username);
      localStorage.setItem("userId", state.userId);
    },

    logout: (state, action) => {
      state.token = null;
      state.username = null;

      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
