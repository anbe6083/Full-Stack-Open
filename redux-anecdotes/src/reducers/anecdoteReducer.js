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

export const createAnecdoteObj = (content) => {
  return {
    type: "CREATE",
    payload: {
      content: content,
      id: getId(),
      votes: 0,
    },
  };
};

export const incrementVoteOf = (id) => {
  return {
    type: "INCREMENT_VOTE",
    payload: {
      id,
    },
  };
};

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_VOTE": {
      const id = action.payload.id;
      const anecdote = state.find((a) => a.id === id);
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote,
      );
    }
    case "CREATE": {
      const newState = [...state, action.payload];
      return newState;
    }
  }

  return state;
};

export default anecdoteReducer;
