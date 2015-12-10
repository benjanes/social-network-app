/* 
  <NewComment />
*/

import React from 'react';

class NewComment extends React.Component {

  constructor() {
    super();

    this.state = {
      showCommentForm : false
    }
  }

  addComment(e) {
    e.preventDefault();

    var postId = this.props.postId;
    var newComment = this.refs.commentBody.value

    this.props.addNewComment(postId, newComment);
    this.refs.newCommentForm.reset();
    this.toggleShowCommentForm(e);
  }

  toggleShowCommentForm(e) {
    e.preventDefault();
    if (!this.state.showCommentForm) {
      this.setState({ showCommentForm : true });
    } else {
      this.setState({ showCommentForm : false });
    }
  }

  renderNewCommentForm() {
    return (
      <form onSubmit={this.addComment.bind(this)} ref="newCommentForm" >
        <h4>Comment</h4>
        <textarea ref="commentBody" />
        <input type="submit" value="Post Comment" />
        <button onClick={this.toggleShowCommentForm.bind(this)}>Cancel Comment</button>
      </form>
    )
  }

  renderNewCommentBtn() {
    return <button onClick={this.toggleShowCommentForm.bind(this)}>Add a Comment!</button>
  }

  render() {

    if (!this.state.showCommentForm) {
      return (
        <span>{this.renderNewCommentBtn()}</span>
      )
    } else {
      return (
        <span>{this.renderNewCommentForm()}</span>
      )
    }
    
  }

}

export default NewComment;