import React, { useState } from 'react';
import '../styles/PostForm.css';

const PostForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [imageUrl, setImageUrl] = useState(initialData.image_url || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, image_url: imageUrl });
    if (!initialData.id) {
      setTitle('');
      setContent('');
      setImageUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">{initialData.id ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
};

export default PostForm;