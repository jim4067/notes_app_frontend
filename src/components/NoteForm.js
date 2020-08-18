import React from 'reeact';


const NoteForm = ({addNote, newNote, handleNoteChange}) => {

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