import {useDispatch, useSelector} from 'react-redux';
import {toggleImportanceOf} from '../reducers/noteReducers';

const Note = ({note, handleClick}) => {
  return (
    <li key={note.id} onClick={handleClick}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch ();
  const notes = useSelector (state => {
    if (state.filter === 'ALL') {
      return state.notes;
    }
    return state.filter === 'IMPORTANT'
      ? state.notes.filter (n => n.important)
      : state.notes.filter (n => !n.important);
  });
  return (
    <ul>
      {notes.map (note => (
        <Note
          note={note}
          handleClick={() => dispatch (toggleImportanceOf (note.id))}
        />
      ))}
    </ul>
  );
};

export default Notes;
