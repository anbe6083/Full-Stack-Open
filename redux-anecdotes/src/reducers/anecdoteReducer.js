import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

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

const initialState = anecdotesAtStart.map(asObject);
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    incrementVoteOf(state, actions) {
      const id = actions.payload;
      const anecdote = state.find((a) => a.id === id);
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote,
      );
    },
    createAnecdoteObj(state, actions) {
      const content = actions.payload;

      state.push({
        content,
        id: getId(),
        votes: 0,
      });
    },
  },
});

export const { incrementVoteOf, createAnecdoteObj } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
