import React, { useState } from 'react';


const NoteForm = ({addNote, newNote, handleNoteChange}) => {
    const [newNote, setNewNote] = useState("");

    return (
        <div>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type='submit'>save</button>
            </form>
        </div>
    );
}

export default NoteForm;