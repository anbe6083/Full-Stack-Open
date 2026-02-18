import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      state = `You voted for: '${action.payload}'`;
      return state;
    },
    removeNotification(state, action) {
      state = null;
      return state;
    },
  },
});

const { setNotification, removeNotification } = notificationSlice.actions;

export const addNotification = (content, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, timeout);
  };
};

export default notificationSlice.reducer;
