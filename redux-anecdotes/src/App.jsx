import {useEffect} from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import Anecdotes from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import {useDispatch} from 'react-redux';
import anecdoteService from './services/anecdotes';
import {setAnecdotes} from './reducers/anecdoteReducer';
const App = () => {
  const dispatch = useDispatch ();
  useEffect (
    () => {
      anecdoteService
        .getAll ()
        .then (anecdotes => dispatch (setAnecdotes (anecdotes)));
    },
    [dispatch]
  );

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  );
};

export default App;
