/* 
  <Comment />
*/

import React from 'react';
import $ from '../helpers';

class Comment extends React.Component {

	render() {
    var comment = this.props.comment;
    var date = $.transformDate(comment.commentId);

		return (
      <li>
        <h5>On <span>{date[1]}</span>, <span>{comment.ownerName}</span> sez</h5>
        <p>"{comment.commentBody}"</p>
      </li>
		)
	}

}

export default Comment;