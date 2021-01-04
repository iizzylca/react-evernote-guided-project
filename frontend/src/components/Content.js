import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';
/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
class Content extends Component {


  renderContent = (status) => {
    if (status ==='edit') {
      return <NoteEditor 
      editBody={this.props.editBody} 
      editTitle={this.props.editTitle} 
      notes={this.props.notes} 
      selectedNote={this.props.selectedNote}
      handleTitleEditChange={this.props.handleTitleEditChange} 
      handleSaveClick={this.props.handleSaveClick}
      handleBodyEditChange={this.props.handleBodyEditChange} 
      handleCancelClick={this.props.handleCancelClick}
      /> 
    } else if (status==='show') {
      return <NoteViewer 
      allProps={this.props}
      handleEditClick={this.props.handleEditClick}
      />;
    } else {
      return <Instructions />;
    }
  }

  render() {
    return (
      <div className='master-detail-element detail'>
        {this.renderContent(this.props.status)}
      </div>
    );
  }
}

export default Content;
