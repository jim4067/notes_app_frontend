import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification'
import Footer from './components/Footer';
import noteService from './services/notes';

const App = (props) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        noteService
            .getAll()
            .then(inititalNotes => {
                setNotes(inititalNotes.data);
            });
    }, [])

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    const addNote = (event) => {
        event.preventDefault();
        const noteobject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        };

        noteService
            .create(noteobject)
            .then(response => {
                setNotes(notes.concat(response.data));
                setNewNote("");
            })
    };


    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    };

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(response => {
                setNotes(notes.map(note => note.id !== id ? note : response.data))
            })
            .catch(err => {
                setErrorMessage(` ${note.content} was already removed from the server`);
                setTimeout(() => setErrorMessage(null), 5000);
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("logging in with ", username, password);
    }

    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} /> 
            
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show{showAll ? "important" : "all"}
                </button>
            </div>
            <ul>

                {notesToShow.map(note =>
                    <Note key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <form onSubmit={addNote} >
                <input value={newNote} onChange={handleNoteChange} /> {" "}
                <button type="submit" >save</button>
            </form>
            <Footer />
        </div>
    );
};





export default App;