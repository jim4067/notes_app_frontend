import React, { useState, useEffect, useRef } from 'react';
import LoginForm from './components/LoginForm';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Footer from './components/Footer';
import loginService from './services/login';
import noteService from './services/notes';
import './App.css';

const App = (props) => {
    const [notes, setNotes] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const noteFormRef = useRef();

    const NoteFormRef = () => {

        return (
            <Togglable buttonLabel="new note" ref={noteFormRef}>
                <NoteForm createNote={addNote} />
            </Togglable>
        );
    }

    useEffect(() => {
        noteService
            .getAll()
            .then(inititalNotes => {
                setNotes(inititalNotes)
            });
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    const addNote = async (noteObject) => {
        await noteFormRef.current.toggleVisibility();

        const response = await noteService.create(noteObject);
        console.log("the response data in addNote is", response)
        setNotes(notes.concat(response));

        /*
        noteService
            .create(noteObject)
            .then(response => {
                setNotes(notes.concat(response.));
            })
        */
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
                setNotes(notes.filter(n => n.id !== id));
                console.log("the error in toggle importance of", err);
            })
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("logging in with", username, password);
        try {
            const user = await loginService.login(
                { username, password }
            )

            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            );

            noteService.setToken(user.token);
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

    if (user === null) {
        return (
            <div>
                <Notification message={errorMessage} />

                <Togglable buttonLabel="login">
                    <LoginForm
                        handleLogin={handleLogin}
                        username={username}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        password={password}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                    />
                </Togglable>
            </div>
        );
    }

    else {
        return (
            <div>
                <h1>Notes</h1>

                <Notification message={errorMessage} />

                <NoteFormRef />

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
    }
};

export default App;