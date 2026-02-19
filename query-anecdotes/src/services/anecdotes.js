const baseUrl = 'http://localhost:3001/anecdotes'
export const fetchAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Problem fetching anecdotes')
  }
  return await response.json()
}

export const addAnecdote = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  }
  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Problem creating new anecdote')
  }
  return await response.json()
}

export const updateVote = async (anecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      ...anecdote,
      votes: anecdote.votes + 1,
    }),
  }
  const response = await fetch(`${baseUrl}/${anecdote.id}`, options)
  if (!response.ok) {
    throw new Error('Problem updating the anecdote')
  }

  return await response.json()
}
