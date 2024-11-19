import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import { getPosts, createPost } from '../services/supabaseService';
import '../styles/Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortAscending, setSortAscending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [sortBy, sortAscending]);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts(sortBy, sortAscending);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      await createPost(postData);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortAscending(!sortAscending);
    } else {
      setSortBy(column);
      setSortAscending(true);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <h1>Welcome to My Awesome Forum</h1>
      <PostForm onSubmit={handleCreatePost} />
      <div className="controls">
        <div className="sort-controls">
          <button onClick={() => handleSort('created_at')}>
            Sort by Date {sortBy === 'created_at' && (sortAscending ? '↑' : '↓')}
          </button>
          <button onClick={() => handleSort('upvotes')}>
            Sort by Upvotes {sortBy === 'upvotes' && (sortAscending ? '↑' : '↓')}
          </button>
        </div>
        <div className="search-control">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <PostList posts={filteredPosts} />
    </div>
  );
};

export default Home;