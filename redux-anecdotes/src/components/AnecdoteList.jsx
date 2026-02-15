import {useSelector, useDispatch} from 'react-redux';
import {incrementVoteOf} from '../reducers/anecdoteReducer';
const Anecdote = ({anecdote, vote}) => {
return (
 <>
<div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote (anecdote.id)}>vote</button>
            </div>
          </div>
 </>
)
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(incrementVoteOf(id));
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
