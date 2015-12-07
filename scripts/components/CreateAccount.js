/*
  CreateAccount component
  <CreateAccount />
*/

import React from 'react';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import $ from '../helpers';

import Firebase from 'firebase';
const ref = new Firebase('https://react-firebase-sn.firebaseio.com/');

class CreateAccount extends React.Component {

  checkUserName(e) {
    e.preventDefault();
    var usernamesRef = ref.child('usernames/');
    var slugified = $.slugify(this.refs.username.value);

    usernamesRef.once('value', snapshot => {
      var data = snapshot.val() || null;

      if (data) {
        if (data.indexOf(slugified) !== -1) {
          alert('This username is already taken, please select another');
          return false;
        }
      }

      this.addUser();
    });
  }

  addUser(usernameList) {
    var hist = this.props.history;
    var username = this.refs.username.value;
    var slug = $.slugify(username);
    var usernamesRef = ref.child('usernames/');

    ref.createUser({

      email : this.refs.email.value,
      password : this.refs.pword.value

    }, function(error, userData) {
      
      if (error) {
        console.log('Error creating user:', error);
      } else {
        var newUserProfile = ref.child('profiles/' + userData.uid);
        newUserProfile.set({ username : username, slug : slug });

        usernamesRef.once('value', snapshot => {
          var usernames = snapshot.val() || null;
          var list = [];

          if (usernames) {
            list = usernames;
          }

          list.push(slug);

          ref.update({ 'usernames' : list });
        });

        console.log('Successfully created user account with uid:', userData.uid);

        hist.goBack();
      }
    });

  }

  render() {
    return (
      <div>
        <h2>Create a new account</h2>
        <form className="new-acct" ref="newAcctForm" onSubmit={this.checkUserName.bind(this)}>
          <label htmlFor="username">Choose a user name</label>
          <input type="text" ref="username" placeholder="Your Name" />
          <label htmlFor="email">Please enter a valid email address</label>
          <input type="email" id="email" ref="email" placeholder="you@email.com" />
          <label htmlFor="password">New password</label>
          <input type="password" id="password" ref="pword" placeholder="password" />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }

}

reactMixin.onClass(CreateAccount, History);

export default CreateAccount;