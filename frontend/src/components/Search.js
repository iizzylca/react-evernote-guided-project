import React from 'react';

const Search = (props) => {
  return (
    <div className="filter">
      <input 
        onChange={(e)=>props.handleSearchInput(e)}
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        value={props.search}
      />
    </div>
  );
}

export default Search;
