import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getPost, updatePost, deletePost, getComments, addComment, upvotePost } from '../services/supabaseService';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import '../styles/PostPage.css';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const fetchedPost = await getPost(id);
      setPost(fetchedPost);
      setEditedTitle(fetchedPost.title);
      setEditedContent(fetchedPost.content);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const fetchedComments = await getComments(id);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async (commentData) => {
    try {
      await addComment({ ...commentData, post_id: id });
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleUpvote = async () => {
    try {
      await upvotePost(id);
      fetchPost();
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleSaveEdit = async () => {
    try {
      await updatePost(id, { title: editedTitle, content: editedContent });
      setIsEditing(false);
      fetchPost();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-page">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-title"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="edit-content"
          />
          <div className="edit-buttons">
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h1>{post.title}</h1>
          {post.image_url && <img src={post.image_url} alt={post.title} className="post-image" />}
          <p className="post-content">{post.content}</p>
          <div className="post-meta">
            <span>Created at: {new Date(post.created_at).toLocaleString()}</span>
            <span>Upvotes: {post.upvotes}</span>
          </div>
          <div className="post-actions">
            <button onClick={handleUpvote}>Upvote</button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
      <h2>Comments</h2>
      <CommentList comments={comments} />
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
};

export default PostPage;