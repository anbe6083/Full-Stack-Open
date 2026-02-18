import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange(state, actions) {
      return actions.payload;
    },
  },
});

export const { filterChange } = filterSlice.actions;

export default filterSlice.reducer;
