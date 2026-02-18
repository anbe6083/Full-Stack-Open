import {useEffect} from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import Anecdotes from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import {useDispatch} from 'react-redux';
import {populateAnecdotes} from './reducers/anecdoteReducer';
const App = () => {
  const dispatch = useDispatch ();
  useEffect (
    () => {
      dispatch (populateAnecdotes ());
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
