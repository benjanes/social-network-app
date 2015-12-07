/* MenuBar */
import React from 'react';
import { Link } from 'react-router';
import Firebase from 'firebase';
const ref = new Firebase('https://react-firebase-sn.firebaseio.com/');

import LogIn from './LogIn';

class MenuBar extends React.Component {

  logIn(e) {
    e.preventDefault();

    var authHandler = this.props.authHandler;
    var refs = this.refs.loginPrompt.refs;

    ref.authWithPassword({
      email : refs.email.value,
      password : refs.pw.value
    }, authHandler.bind(this));
  }

  renderLoggedOutMenu() {
    return (
      <ul className="menu-ul">
        <Link to="/create-account"><li>Create Account</li></Link>
        <li onClick={this.props.toggleLogin}>Login</li>
        { this.props.showLoginPrompt ? <LogIn ref="loginPrompt" logIn={this.logIn.bind(this)} /> : null }
      </ul>
    )
  }

  renderLoggedInMenu() {
    return (
      <ul className="menu-ul">
        <Link to={`/profile/${this.props.userName}`}><li>Your Profile</li></Link>
        <Link to={`/profile/${this.props.userName}/edit-profile`}><li>Edit Profile</li></Link>
        <Link to="/"><li>Home</li></Link>
        <Link to="/" onClick={this.props.logOut}><li>Log Out</li></Link>
      </ul>
    )
  }

  render() {
    if(!this.props.loggedIn) {
      return (
        <span>{this.renderLoggedOutMenu()}</span>
      ) 
    }

    return (
      <span>{this.renderLoggedInMenu()}</span>
    )
    
  }

}

export default MenuBar;