import React, { useState } from 'react';


const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState("");

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault();

        createNote({
            content: newNote,
            important: Math.random > .5
        });

        setNewNote("");
    }

    return (
        <div className='formDiv'>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type='submit'>save</button>
            </form>
        </div>
    );
}

export default NoteForm;

//only one prop is left createNote.
//it is called when the form creates a new note