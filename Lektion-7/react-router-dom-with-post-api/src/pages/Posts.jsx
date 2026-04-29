import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostList from '../components/PostList.jsx'
import { getAllPosts } from '../api/postsApi'

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Använd API-funktionen istället för fetch
      const data = await getAllPosts();
      setPosts(data);

    } catch(error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []) // An Empty array as second argument, ensures "Effect" will only run at componentDidMount

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Error loading posts</h2>
        <p>{error}</p>
        <button onClick={fetchPosts}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Posts</h1>
      <Link to="/posts/create">
        <button>Create New Post</button>
      </Link>
      <PostList posts={posts} onDelete={fetchPosts} />
    </div>
  )
}

export default Posts