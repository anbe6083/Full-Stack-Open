import { createSlice } from "@reduxjs/toolkit";

export const getId = () => (100000 * Math.random()).toFixed(0);
export const randomInt = () => {
  return Math.floor(Math.random() * 100000);
};

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    incrementVoteOf(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote,
      );
    },
    createAnecdoteObj(state, action) {
      const content = action.payload;

      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { incrementVoteOf, createAnecdoteObj, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
