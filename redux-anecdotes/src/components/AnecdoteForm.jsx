import {useDispatch} from 'react-redux';
import {appendAnecdote, } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch ();
  const createNewAnecdote = e => {
    e.preventDefault ();
    dispatch(appendAnecdote(e.target.anecdote.value))
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
