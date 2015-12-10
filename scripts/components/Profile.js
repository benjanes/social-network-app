/* Profile */

import React from 'react';
import NewPost from './NewPost';

import Firebase from 'firebase';
const ref = new Firebase('https://react-firebase-sn.firebaseio.com/');
const profileRef = ref.child('profiles');
const postsRef = ref.child('posts');

class Profile extends React.Component {

  constructor() {
    super();

    this.state = {
      profile : {},
      posts : {}
    }
  }

  componentWillMount() {
    this.updateProfileState(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateProfileState(newProps);
  }

  updateProfileState(props) {
    var profilePath = props.routeParams.userId;

    this.profWatcher = profileRef.orderByChild('slug').equalTo(profilePath).on('value', snapshot => {
      var data = snapshot.val();
      var profile = data[Object.keys(data)[0]];
      
      this.setState({ profile : profile });
    });

    this.postWatcher = postsRef.orderByChild('owner').equalTo(profilePath).on('value', snapshot => {
      var data = snapshot.val();

      this.setState({ posts : data });
    });
  }

  componentWillUnmount() {
    profileRef.off('value', this.refWatcher);
  }

  renderPost(key) {

    return (
      <li key={key}>
        <h4>{key.postTitle}</h4>
        <p>{key.postBody}</p>
      </li>
    )
  }

  render() {
  	var profile = this.state.profile;

    return (
      <div>
        <h2>{profile.name}</h2>
        <p>{profile.desc}</p>
        <h3>Posts</h3>
        	<ul>
            {/*Object.keys(this.state.posts).map(this.renderPost)*/}
          </ul>

        {/* only render this if it is the profile of the logged in user */}
        <NewPost addNewPost={this.props.addNewPost} />

      </div>
    )
  }

}

export default Profile;