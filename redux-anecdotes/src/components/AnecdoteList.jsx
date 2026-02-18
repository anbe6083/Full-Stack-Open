import {useSelector, useDispatch} from 'react-redux';
import {incrementVoteOf} from '../reducers/anecdoteReducer';
import { removeNotification, setNotification } from '../reducers/notificationReducer';
const Anecdote = ({anecdote, vote}) => {
return (
 <>
<div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote (anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
 </>
)
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const vote = (id, content) => {
    dispatch(incrementVoteOf(id));
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  };
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <>
      {[...filteredAnecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote anecdote={anecdote} vote={vote} key={anecdote.id} />
        ))}
    </>
  )
};

export default Anecdotes;
