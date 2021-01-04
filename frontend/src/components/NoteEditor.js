import React, { Component } from 'react';

class NoteEditor extends Component {


  render() {

    return (
      <form className="note-editor" onSubmit={(e)=>{this.props.handleSaveClick(e)}}>
        <input type="text" name="title" value={this.props.editTitle} onChange={(e)=>this.props.handleTitleEditChange(e)}/>
        <textarea name="body" value={this.props.editBody} onChange={(e)=>this.props.handleBodyEditChange(e)}/>
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button" onClick={()=>this.props.handleCancelClick()}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;