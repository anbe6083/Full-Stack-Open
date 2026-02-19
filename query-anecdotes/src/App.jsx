import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import {addAnecdote, fetchAnecdotes, updateVote} from './services/anecdotes';
const App = () => {
  const queryClient = useQueryClient ();

  const handleVote = anecdote => {
    console.log ('vote');
    mutation.mutate (anecdote);
  };

  const {isPending, isError, data, error} = useQuery ({
    queryKey: ['anecdotes'],
    queryFn: fetchAnecdotes,
  });

  const mutation = useMutation ({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries ({queryKey: ['anecdotes']});
    },
  });

  if (isPending) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Problems loading anecdotes from the server</span>;
  }

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map (anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote (anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
