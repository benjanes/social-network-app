/* Home */

import React from 'react';
import { Link } from 'react-router';

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
    var profiles = ref.child('profiles');
    
    profiles.limitToFirst(5).once('value', snapshot => {
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
          <Link to={`/profile/${val.slug}`}><h2>{val.name}</h2></Link>
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