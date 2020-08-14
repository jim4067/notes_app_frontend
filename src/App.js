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

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({                     //local user is used in setUser but not 
                username, password,                                     //global user
            });

            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setErrorMessage("wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    }

    //one solution to remove the errors and warnins is to set the login and
    //noteform as components.
    const loginForm = () => {
        <form onSubmit={handleLogin} >
            <div>
                username <input type='text' value={username} name="Username" onChange={({ target }) => setUsername(target.username)} />
            </div>
            <div>
                password <input type='password' value={password} name="Password" onChange={({ target }) => setPassword(target.password)} />
            </div>
            <button type='submit'>login</button>
        </form>
    }

    const noteForm = () => {
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange} />
            <button type='submit'>save</button>
        </form>
    }

    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} />

            {user === null
                ?
                loginForm()
                :
                <div>
                    <p>{user.name} logged-in</p>
                    {noteForm()}
                </div>
            }

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