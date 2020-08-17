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
    const [user, setUser] = useState(null);

    useEffect(() => {
        noteService
            .getAll()
            .then(inititalNotes => {
                setNotes(inititalNotes.data);
            });
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
    }, []);

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    const addNote = async (event) => {
        event.preventDefault();
        const noteobject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        };

        const response = await noteService.create(noteobject);
        setNotes(notes.concat(response.data));
        setNewNote("");
        /* 
        noteService
            .create(noteobject)
            .then(response => {
                setNotes(notes.concat(response.data));
                setNewNote("");
            })
        */
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

    const NoteForm = () => {

        return (
            <div>
                <form onSubmit={addNote}>
                    <input value={newNote} onChange={handleNoteChange} />
                    <button type='submit'>save</button>
                </form>
            </div>
        );
    }

    const LoginForm = () => {

        return (
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

        );
    }

    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} />

            {user === null
                ?
                <LoginForm />
                :
                <NoteForm />
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