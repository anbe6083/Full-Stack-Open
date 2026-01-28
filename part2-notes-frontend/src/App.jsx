import Footer from './components/Footer';
import {useEffect, useState} from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import './index.css';
import {Notification} from './components/Notification';
const App = () => {
  const [notes, setNotes] = useState ([]);
  const [newNote, setNewNote] = useState ('a new note...');
  const [errorMessage, setErrorMessage] = useState (null);
  const toggleImportanceOf = id => {
    const note = notes.find (n => n.id === id);
    const changedNote = {...note, important: !note.important};
    noteService
      .update (id, changedNote)
      .then (returnedNote => {
        setNotes (notes.map (note => (note.id === id ? returnedNote : note)));
      })
      .catch (e => {
        setErrorMessage (
          `Note ${note.content} was already removed from the server`
        );
        setTimeout (() => {
          setErrorMessage (null);
        }, 5000);
        setNotes (notes.filter (n => n.id !== id));
      });
  };

  const addNote = event => {
    event.preventDefault ();
    const noteObject = {
      content: newNote,
      important: Math.random () > 0.5,
      id: String (notes.length + 1),
    };
    noteService.create (noteObject).then (newNote => {
      setNotes (notes.concat (newNote));
      setNewNote ('');
    });
  };

  const handleNoteChange = event => {
    console.log (event.target.value);
    setNewNote (event.target.value);
  };

  const hook = () => {
    noteService.getAll ().then (initialData => {
      setNotes (initialData);
    });
  };
  useEffect (hook, []);
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notes.map (note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf (note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
