import {useDispatch} from 'react-redux';
import {appendAnecdote, } from '../reducers/anecdoteReducer';
import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';

const AnecdoteForm = () => {
  const {notificationDispatch} = useContext(NotificationContext)
  const dispatch = useDispatch ();
  const createNewAnecdote = e => {
    e.preventDefault ();
    if(e.target.anecdote.value.length < 5) {
      notificationDispatch({type:"SET", payload: "The anecdote you tried submitting must be at least 5 characters"}) 
      setTimeout(() => {
        notificationDispatch({type:"REMOVE"})
      }, 5000)
    } else {
    dispatch(appendAnecdote(e.target.anecdote.value))
    }
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
