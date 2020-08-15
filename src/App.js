import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification'
import Footer from './components/Footer';
import loginService from './services/login';
import noteService from './services/notes';

const App = (props) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
        noteService
            .getAll()
            .then(inititalNotes => {
                setNotes(inititalNotes.data);
            });
    }, []);

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

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("logging in with", username, password);
        try {
            const user = await loginService.login(
                { username, password }
            )

            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setErrorMessage("wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000)
        }
    }

    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} />

            <form onSubmit={handleLogin} >
                <div>
                    username <input
                        name='username'
                        onChange={(event) => setUsername(event.target.value)}
                        type='name'
                        value={username} />
                </div>
                <div>
                    password <input
                        name='password'
                        onChange={(event) => setPassword(event.target.value)}
                        type='password'
                        value={password} />
                </div>
                <button type='submit'>login</button>
            </form>

            <div>
                <form onSubmit={addNote}>
                    <input value={newNote} onChange={handleNoteChange} />
                    <button type='submit'>save</button>
                </form>
            </div>

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show{showAll ? "important" : "all"}
                </button>
            </div>

            <ul>
                {notesToShow.map((note, i) =>
                    <Note key={i}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>

            <Footer />
        </div>
    );
};

export default App;