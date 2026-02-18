import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
export const getId = () => (100000 * Math.random()).toFixed(0);
export const randomInt = () => {
  return Math.floor(Math.random() * 100000);
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    incrementVoteOf(state, action) {
      const id = action.payload.id;
      const anecdote = state.find((a) => a.id === id);
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote,
      );
    },
    createAnecdoteObj(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const { setAnecdotes, createAnecdoteObj } = anecdoteSlice.actions;
export const populateAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdoteObj(newAnecdote));
  };
};

export const updateVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVote(anecdote);
    dispatch(incrementVoteOf(updatedAnecdote));
  };
};

export const { incrementVoteOf } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
