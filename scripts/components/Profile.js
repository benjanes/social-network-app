/* Profile */

import React from 'react';
import Post from './Post';
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
      var data = snapshot.val() || {};

      this.setState({ posts : data });
    });
    
  }

  componentWillUnmount() {
    profileRef.off('value', this.refWatcher);
    postsRef.off('value');
  }

  renderPost(key) {
    return (
      <Post 
        post={this.state.posts[key]} 
        key={key} 
        currentProfileUid={this.state.profile.uid} 
        currentUserUid={this.props.userProfile.uid}
        removePost={this.props.removePost}
        postId={key}
        addNewComment={this.props.addNewComment}
        loggedIn={this.props.loggedIn}
      />
    )
  }

  render() {
  	var profile = this.state.profile;
    var posts = this.state.posts;

    return (
      <div>
        <div className="left-col">
          <h3>Posts</h3>
        	<ul>
            {Object.keys(this.state.posts).reverse().map(this.renderPost.bind(this))}
          </ul>
        </div>

        <div className="right-col">

          <div className="profile-right">

            <div className="profile-card">
              <div className="profile-pic">
                <div className="profile-pic-inner" style={{ backgroundImage : 'url(' + profile.imgLink + ')' }} ></div>
                <div className="profile-pic-border"><div className="profile-pic-border-inner"></div></div>
              </div>
              <div className="profile-name">
                <h2>{profile.name}</h2>
              </div>
              <p className="profile-desc">{profile.desc}</p>
            </div>

            {/* only render this if it is the profile of the logged in user */}
            { this.state.profile.uid === this.props.userProfile.uid ? <NewPost addNewPost={this.props.addNewPost} /> : null }
          
          </div>
        </div>

      </div>
    )
  }

}

export default Profile;