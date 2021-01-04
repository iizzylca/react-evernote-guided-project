import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {

  return (
    <ul>
      {props.notes.map(note=> {
      return <NoteItem 
      key={note.id}
      noteId={note.id}
      title={note.title}
      body={note.body.substring(0,16)+'...'}
      handleClick={props.handleClick}
      />
      })
      }
    </ul>
  );
}

export default NoteList;