import React from 'react';
import PostItem from './PostItem';
import '../styles/PostList.css';

const PostList = ({ posts }) => (
  <div className="post-list">
    {posts.map(post => (
      <PostItem key={post.id} post={post} />
    ))}
  </div>
);

export default PostList;