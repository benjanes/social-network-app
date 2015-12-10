/* 
  <Post />
*/

import React from 'react';
import NewComment from './NewComment';
import Comment from './Comment';
import $ from '../helpers';

class Post extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comments : props.post.comments || {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ comments : nextProps.post.comments || {} });
  }

  deletePost(e) {
    e.preventDefault();

    this.props.removePost(this.props.postId);
  }

  renderComment(key) {
    return (
      <Comment
        key={key}
        comment={this.state.comments[key]}
      />
    )
  }

  render() {
    var post = this.props.post;
    var date = $.transformDate(post.postId);

    return (
      <li id={this.props.key}>
        <h4>{post.postTitle}</h4>
        <p><span>{date[0]}</span><span>{date[1]}</span></p>
        <p>{post.postBody}</p>
        
        { this.props.currentProfileUid === this.props.currentUserUid ? <button onClick={this.deletePost.bind(this)}>Remove Post</button> : null }

        <ul>
          {Object.keys(this.state.comments).map(this.renderComment.bind(this))}
        </ul>

        { this.props.loggedIn ? <NewComment postId={this.props.postId} addNewComment={this.props.addNewComment} /> : null }
      </li>
    )
  }

}

export default Post;