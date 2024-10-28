import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      state.input = action.payload;
    },

    resetInput: (state) => {
      state.input = "";
    },
  },
});

export const { setSearchInput, resetInput } = searchSlice.actions;
export default searchSlice.reducer;
