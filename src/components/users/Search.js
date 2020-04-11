import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
  // destructure props and methods like this
  const [text, setText] = useState(""); // let's us use state in a functional component - text = initial state, setText = update state

  // method captures the text input
  const onChange = (e) => setText(e.target.value); // setText updates the state

  const onSubmit = (e) => {
    e.preventDefault(); // prevent form from refreshing page
    if (text === "") {
      setAlert("Please enter something", "light"); // setAlert() lives in App.js
    } else {
      searchUsers(text); // searchUsers() lives in App.js
      setText(""); // setText updates the state
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {/* if prop showClear is true, the button shows */}
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
