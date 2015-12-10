/* Home */

import React from 'react';

// Firebase
import Firebase from 'firebase';
const ref = new Firebase('https://react-firebase-sn.firebaseio.com/');

class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      topProfiles : []
    }
  }

  componentDidMount() {
    //console.log('mounted');
    var profiles = ref.child('profiles');
    
    profiles.limitToFirst(2).once('value', snapshot => {
      var data = snapshot.val() || {};
      var keys = Object.keys(data);
      var profiles = [];
      keys.forEach( val => { 
        profiles.push(data[val])
      });
      
      this.setState({ topProfiles : profiles });
    });
  }

  renderPopProfile(val) {
    if(val) {
      return (
        <li key={val.name}>
          <h2>{val.name}</h2>
        </li>
      )
    }

    return null;
      
  }

	render() {
    var topProfiles = this.state.topProfiles;
    //console.log(topProfiles);

		return (
      <div>
      <h2>Top Users</h2>
      <ul>
        {topProfiles.map(this.renderPopProfile)}
      </ul>
      </div>
		)
	}

}

export default Home;