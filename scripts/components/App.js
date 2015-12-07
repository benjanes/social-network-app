/* App */
import React from 'react';
import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';

// Firebase
import Firebase from 'firebase';
const ref = new Firebase('https://react-firebase-sn.firebaseio.com/');

import MenuBar from './MenuBar';


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      userProfile : {},
      uid : null,
      loggedIn : false,
      userName : null,
      showLoginPrompt : false
    }
  }

  componentWillMount() {
    var token = localStorage.getItem('token');

    if(token) {
      ref.authWithCustomToken(token, this.authHandler.bind(this));
    }
  }

  authHandler(err, authData) {
    if (err) {
      alert(err);
      return;
    }

    // save the login token in the browser
    localStorage.setItem('token', authData.token);
    localStorage.setItem('currUid', authData.uid);

    var userData = ref.child('profiles/' + authData.uid);

    userData.on('value', snapshot => {
      var data = snapshot.val() || {};

      this.setState({ userName : data.slug });

      this.logInUser(data);
    });

  }

  setProfile(profile) {
    var currUser = localStorage.getItem('currUid');
    var dataPath = ref.child('profiles/' + currUser);

    this.setState({ userProfile : profile });

    dataPath.update({ profile : profile});
  }

  logOut() {
    this.setState({ loggedIn : false });
    localStorage.removeItem('token');
    localStorage.removeItem('currUid');
  }

  logInUser(userData) {
    this.setState({ loggedIn : true });
    this.setState({ showLoginPrompt : false });

    var defaultProfile = {
      name : userData.username,
      desc : 'A desc of you!',
      imgLink : ''
    }

    if (userData.profile) {
      this.setState({ userProfile : userData.profile });
    } else {
      this.setState({ userProfile : defaultProfile });
    }
    
  }

  toggleLogin() {
    if (!this.state.showLoginPrompt) {
      this.setState({ showLoginPrompt : true });
    } else {
      this.setState({ showLoginPrompt : false });
    }
  }

  render() {
    return (
      <div>
        <header>
          <span><h2>Site Title</h2></span>
          <MenuBar 
            loggedIn={this.state.loggedIn} 
            userName={this.state.userName} 
            logOut={this.logOut.bind(this)}
            logInUser={this.logInUser.bind(this)}
            authHandler={this.authHandler.bind(this)}
            showLoginPrompt={this.state.showLoginPrompt}
            toggleLogin={this.toggleLogin.bind(this)}
          />
        </header>

        {this.props.children && React.cloneElement(this.props.children, {
          setProfile : this.setProfile.bind(this),
          userProfile : this.state.userProfile,
          linkState : this.linkState.bind(this)
        })}

      </div>
    )
  }

}

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;