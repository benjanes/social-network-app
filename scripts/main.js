import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

// components
import App from './components/App';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import CreateAccount from './components/CreateAccount';
import NotFound from './components/NotFound';

var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <Route path="profile/:userId" component={Profile} />
      <Route path="profile/:userId/edit-profile" component={EditProfile} />
      <Route path="create-account" component={CreateAccount} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(routes, document.querySelector('#app-container'));