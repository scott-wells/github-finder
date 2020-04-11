import React, { useState } from "react";
import PropTypes from "prop-types";

// destructure props and methods like this
const Search = ({ showClear, clearUsers, setAlert, searchUsers }) => {
  const [text, setText] = useState(""); // let's us use state in a functional component - text = initial state, setText = update state

  const onSubmit = (e) => {
    e.preventDefault(); // prevent form from refreshing page
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      searchUsers(text);
      setText(""); // setText updates the state
    }
  };

  // method captures the text input
  const onChange = (e) => setText(e.target.value); // setText updates the state

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          value={text}
          placeholder='Search Users...'
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
