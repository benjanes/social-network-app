/* NewMessage */

import React from 'react';

class NewPost extends React.Component {

  constructor() {
    super();

    this.state = {
      showForm : false
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

  toggleShowForm(e) {
    e.preventDefault();
    if (!this.state.showForm) {
      this.setState({ showForm : true });
    } else {
      this.setState({ showForm : false });
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
        <button onClick={this.toggleShowForm.bind(this)}>Cancel Post</button>
      </form>
    )
  }

  renderNewPostBtn() {
    return <button onClick={this.toggleShowForm.bind(this)}>Write new post!</button>
  }

  render() {

    if (!this.state.showForm) {
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