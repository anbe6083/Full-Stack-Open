const baseUrl = "http://localhost:3001/anecdotes";
const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Couldn't get anecdotes");
  }
  return await response.json();
};

const createNew = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  };
  const response = await fetch(baseUrl, options);
  if (!response.ok) {
    throw new Error("Problem creating new anecdote");
  }
  return response.json();
};

const updateVote = async (anecdote) => {
  const options = {
    method: "PUT",
    body: JSON.stringify({
      ...anecdote,
      votes: anecdote.votes + 1,
    }),
  };
  const response = await fetch(`${baseUrl}/${anecdote.id}`, options);
  if (!response.ok) {
    throw new Error("Problem updating anecdote");
  }
  return response.json();
};

export default { getAll, createNew, updateVote };
