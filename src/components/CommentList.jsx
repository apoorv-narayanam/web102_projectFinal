import React from 'react';
import '../styles/CommentList.css';

const CommentList = ({ comments }) => (
  <div className="comment-list">
    {comments.map((comment, index) => (
      <div key={index} className="comment">
        <p>{comment.content}</p>
        <span className="comment-date">{new Date(comment.created_at).toLocaleString()}</span>
      </div>
    ))}
  </div>
);

export default CommentList;