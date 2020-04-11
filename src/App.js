import React, { useState, Fragment } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Searches Github users
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get single Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      // different query than searchUsers()
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  // Get user's repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      // different query than searchUsers()
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  // Clears Github users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }; // clearUsers lives in Search.js

  // Alert form validation
  const showAlert = (msg, type) => {
    setAlert({ msg, type }); // msg, type passed in Search.js
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path={`/user/:login`}
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
