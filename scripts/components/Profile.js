/* Profile */

import React from 'react';
import NewPost from './NewPost';
import $ from '../helpers';

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
    var post = this.state.posts[key];
    var date = $.transformDate(post.postId);

    return (
      <li key={key} id={key} ref={key}>
        <h4>{post.postTitle}</h4>
        <p><span>{date[0]}</span><span>{date[1]}</span></p>
        <p>{post.postBody}</p>
        <button onClick={this.deletePost.bind(this)}>Remove Post</button>
      </li>
    )
  }

  deletePost(e) {
    e.preventDefault();

    //console.log(this);

    this.props.removePost(e.target.parentElement.id);
  }

  render() {
  	var profile = this.state.profile;
    var posts = this.state.posts;

    //console.log(posts);

    return (
      <div>
        <h2>{profile.name}</h2>
        <p>{profile.desc}</p>

        {/* only render this if it is the profile of the logged in user */}
        { this.state.profile.uid === this.props.userProfile.uid ? <NewPost addNewPost={this.props.addNewPost} /> : null }

        <h3>Posts</h3>
        	<ul>
            {Object.keys(this.state.posts).reverse().map(this.renderPost.bind(this))}
          </ul>

      </div>
    )
  }

}

export default Profile;