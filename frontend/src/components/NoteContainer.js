import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {

state = {
  notes: [],
  status: "",
  editTitle: "",
  editBody: "",
  clickedNote: null,
  search: ""
}


componentDidMount() {
    fetch("http://localhost:3000/api/v1/notes")
    .then(r=>r.json())
    .then(notes=>this.setState({
      notes:notes
    }))
  }


  handleClick = (noteId) => {
    this.setState({
      clickedNote: noteId,
      status: "show"
    })
  }

  handleEditClick = () => {
    this.setState({status: "edit"})
    const allNotes = this.state.notes
    const targetId = this.state.clickedNote
    const targetNote = allNotes.find(note=> {
      return note.id === targetId
    })
    this.setState({editTitle: targetNote.title, editBody: targetNote.body})
  }

  handleSaveClick = () => {
    const id = this.state.clickedNote
    fetch(`http://localhost:3000/api/v1/notes/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.editTitle,
        body: this.state.editBody
      }),
    })
    .then(res=> res.json())
    .then(resObj => {
      let savedNote = resObj
      let noteToBeUpdated = this.state.notes.find(note=> {
        return note.id === savedNote.id
      })
      noteToBeUpdated.title = savedNote.title
      noteToBeUpdated.body = savedNote.body

      this.setState({
        notes: this.state.notes
      })
    })
  }

  handleTitleEditChange = (event) => {
      this.setState({
        editTitle:event.target.value
      })
    }

  handleBodyEditChange = (event) =>{
    this.setState({
      editBody:event.target.value
    })

  } 

  handleCancelClick = () => {
    this.setState({
      status: "show"
    })
  }

  handleNewClick = () => {
    fetch("http://localhost:3000/api/v1/notes", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'},
    body: JSON.stringify({
      title: 'New Note',
      body: 'default description'
    }),
    })
    .then(res=>res.json())
    .then(resObj => {
      const newNote = resObj
      this.setState({
        notes: this.state.notes.concat(newNote)
      })
    })
  }

  handleSearchInput = (event) => {
    this.setState({search:event.target.value})
  }

  filterNotes = (input) => {
    return this.state.notes.filter(note => {
      return note.title.toLowerCase().includes(this.state.search.toLowerCase())
    })
  }

  sortThroughNotes = () => {
    const notesCopy = [...this.state.notes]
    notesCopy.sort(function(a,b){
      let titleA = a.title.toUpperCase();
      let titleB = b.title.toUpperCase();
      if(titleA < titleB) {
        return -1
      }
      if (titleA > titleB) {
        return 1
      }
      return 0
    });
    this.setState({
      notes: notesCopy
    })
  }

  render() {
    return (
      <Fragment>
        <button onClick={()=>{this.sortThroughNotes()}}>Sort By title</button><br></br>
        <Search 
          handleSearchInput={this.handleSearchInput} 
          search={this.state.search}
        />
        <div className='container'>
          <Sidebar 
          notes={this.filterNotes(this.state.search)} 
          handleClick={this.handleClick} 
          handleNewClick={this.handleNewClick} 
          />
          <Content 
          editTitle={this.state.editTitle} 
          editBody={this.state.editBody} 
          notes={this.state.notes} 
          selectedNote={this.state.clickedNote} 
          status={this.state.status} 
          handleEditClick={this.handleEditClick} 
          handleSaveClick={this.handleSaveClick} 
          handleTitleEditChange={this.handleTitleEditChange}
          handleBodyEditChange={this.handleBodyEditChange} 
          handleCancelClick={this.handleCancelClick}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;