import React, { Fragment } from 'react';

const NoteViewer = (props) => {
	const notes = props.allProps.notes
	const selectedNoteId = props.allProps.selectedNote
	const selectedNote = notes.find(function(note){return note.id === selectedNoteId})
  return (
    <Fragment>
      <h2>
        {selectedNote.title}
      </h2>
      <p>
        {selectedNote.body}
      </p>
      <button onClick={()=> props.handleEditClick()}>
        Edit
      </button>
      
    </Fragment>
  );
}

export default NoteViewer;
