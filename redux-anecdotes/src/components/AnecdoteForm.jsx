import {useDispatch} from 'react-redux';
import {createAnecdoteObj} from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch ();
  const createNewAnecdote = e => {
    e.preventDefault ();
    anecdoteService.createNew(e.target.anecdote.value).then(anecdote => {
      dispatch(createAnecdoteObj(anecdote))
    })
  };

  return (
      <>
      <h2>create new</h2>
    <form onSubmit={createNewAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
      </>

  );
};

export default AnecdoteForm;
