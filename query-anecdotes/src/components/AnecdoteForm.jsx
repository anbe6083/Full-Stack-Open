import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addAnecdote} from '../services/anecdotes';
const AnecdoteForm = () => {
  const queryClient = useQueryClient ();

  const mutation = useMutation ({
    mutationFn: addAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries ({queryKey: ['anecdotes']});
    },
  });

  const onCreate = event => {
    event.preventDefault ();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    console.log ('new anecdote');
    mutation.mutate ({
      content,
      votes: 0,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
