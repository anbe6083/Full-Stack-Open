import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    setNotification(state, actions) {
      state = `You voted for: '${actions.payload}'`;
      return state;
    },
    removeNotification(state, actions) {
      state = null;
      return state;
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
