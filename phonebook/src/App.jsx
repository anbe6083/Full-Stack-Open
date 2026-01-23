import {useState, useEffect} from 'react';
import personService from './services/persons';
import {
  NotificationFailure,
  NotificationSuccess,
} from './components/Notification';
import './index.css';
const PhonebookEntry = ({name, number, handleDelete}) => {
  return (
    <div>
      {' '}
      {name} {number} <button onClick={handleDelete}> Delete</button>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState ([]);
  const [newName, setNewName] = useState ('');
  const [number, setNumber] = useState ('');
  const [successMessage, setSuccessMessage] = useState (null);
  const [failureMessage, setFailureMessage] = useState (null);
  const handlePhoneInputChange = e => {
    console.log (e.target.value);
    setNumber (e.target.value);
  };

  const addPerson = e => {
    e.preventDefault ();
    const personObj = {
      name: newName,
      number: number,
    };
    const existingPersonObj = persons.find (p => p.name === personObj.name);
    if (existingPersonObj) {
      const confirmUpdatePhoneNumberText = `${personObj.name} already exists. Replace the old phone number with a new one?`;
      if (window.confirm (confirmUpdatePhoneNumberText)) {
        personService
          .updatePerson ({...existingPersonObj, number: number})
          .then (() => {
            setPersons (
              persons.map (
                p =>
                  p.id === existingPersonObj.id
                    ? {...personObj, id: existingPersonObj.id}
                    : p
              )
            );
          })
          .catch (() => {
            setFailureMessage (
              `Information of ${existingPersonObj.name} has already been deleted from the server`
            );
            setTimeout (() => {
              setFailureMessage (null);
            }, 5000);
          });
      }
    } else {
      personService.create (personObj).then (newPerson => {
        setSuccessMessage (`${personObj.name} successfully added to contacts`);
        setTimeout (() => {
          setSuccessMessage (null);
        }, 5000);
        setPersons (persons.concat (newPerson));
        setNewName ('');
        setNumber ('');
      });
    }
  };

  const handleInputChange = e => {
    console.log (e.target.value);
    setNewName (e.target.value);
  };

  const deletePerson = id => {
    const person = persons.find (p => p.id === id);
    if (window.confirm (`Delete ${person.name}?`)) {
      personService.deletePerson (id).then (() => {
        setPersons (persons.filter (p => p.id !== id));
      });
    }
  };

  useEffect (() => {
    personService.getAll ().then (allPersons => {
      setPersons (allPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationSuccess message={successMessage} />
      <NotificationFailure message={failureMessage} />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          Number: <input value={number} onChange={handlePhoneInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map (p => (
        <PhonebookEntry
          key={p.id}
          name={p.name}
          number={p.number}
          handleDelete={() => deletePerson (p.id)}
        />
      ))}
    </div>
  );
};

export default App;
