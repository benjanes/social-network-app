/* 
  <NewPost/> 
*/

import React from 'react';

class NewPost extends React.Component {

  constructor() {
    super();

    this.state = {
      showPostForm : false
    }
  }

  addPost(e) {
    e.preventDefault();

    var newPost = {
      title : this.refs.postTitle.value,
      body : this.refs.postBody.value
    };

    this.props.addNewPost(newPost);
  }

  toggleShowPostForm(e) {
    e.preventDefault();
    if (!this.state.showPostForm) {
      this.setState({ showPostForm : true });
    } else {
      this.setState({ showPostForm : false });
    }
  }

  renderNewPostForm() {
    return (
      <form onSubmit={this.addPost.bind(this)}>
        <h4>Post Title</h4> 
        <input type="text" ref="postTitle" />
        <h4>Post</h4>
        <textarea ref="postBody" />
        <input type="submit" value="Post new message" />
        <button onClick={this.toggleShowPostForm.bind(this)}>Cancel Post</button>
      </form>
    )
  }

  renderNewPostBtn() {
    return <button onClick={this.toggleShowPostForm.bind(this)}>Write new post!</button>
  }

  render() {

    if (!this.state.showPostForm) {
      return (
        <span>{this.renderNewPostBtn()}</span>
      )
    } else {
      return (
        <span>{this.renderNewPostForm()}</span>
      )
    }
    
  }

}

export default NewPost;