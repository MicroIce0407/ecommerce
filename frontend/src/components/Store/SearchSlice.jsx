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
  },
});

export const { setSearchInput } = searchSlice.actions;
export default searchSlice.reducer;
