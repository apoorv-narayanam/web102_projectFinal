import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PostItem.css';

const PostItem = ({ post }) => (
  <div className="post-item">
    <Link to={`/post/${post.id}`} className="post-title">
      <h2>{post.title}</h2>
    </Link>
    <p>{post.content.substring(0, 100)}...</p>
    <div className="post-meta">
      <span>Created: {new Date(post.created_at).toLocaleString()}</span>
      <span>Upvotes: {post.upvotes}</span>
    </div>
  </div>
);

export default PostItem;