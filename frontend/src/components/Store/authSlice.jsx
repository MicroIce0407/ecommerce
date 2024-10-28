import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
  userId: localStorage.getItem("userId") || null,
};

const setLocalStorage = ({ token, username, userId }) => {
  if (token) localStorage.setItem("token", token);
  if (username) localStorage.setItem("username", username);
  if (userId) localStorage.setItem("userId", userId);
};

const removeLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, username, userId } = action.payload;

      state.token = token;
      state.username = username;
      state.userId = userId;

      setLocalStorage({ token, username, userId });
    },

    logout: (state) => {
      state.token = null;
      state.username = null;
      state.userId = null;

      removeLocalStorage();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
