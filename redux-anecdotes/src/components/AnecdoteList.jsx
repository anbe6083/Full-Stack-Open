import {useSelector, useDispatch} from 'react-redux';
import { updateVote} from '../reducers/anecdoteReducer';
import { addNotification,    } from '../reducers/notificationReducer';
import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';
const Anecdote = ({anecdote, vote}) => {
return (
 <>
<div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote (anecdote)}>vote</button>
            </div>
          </div>
 </>
)
};

const Anecdotes = () => {
 const {notificationDispatch} = useContext(NotificationContext) 

  const dispatch = useDispatch();
  const vote = (anecdote) => {
    dispatch(updateVote(anecdote))
    notificationDispatch({ type: "SET", payload: `You voted for '${anecdote.content}'` })
    setTimeout(() => {
      notificationDispatch({ type: "REMOVE" })
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
