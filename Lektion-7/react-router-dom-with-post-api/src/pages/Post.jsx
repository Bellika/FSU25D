import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import PostComponent from '../components/Post.jsx';
import { getPostById, deletePost } from '../api/postsApi';

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      // Använd API-funktionen med id från URL
      const data = await getPostById(id);
      setPost(data);

    } catch(error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      setDeleting(true);
      await deletePost(id);
      alert('Post deleted successfully!');
      navigate('/posts'); // Navigera tillbaka till posts-listan
    } catch (error) {
      console.error(error);
      alert(`Failed to delete post: ${error.message}`);
    } finally {
      setDeleting(false);
    }
  }

  useEffect(() => {
    fetchPost();
  }, [id]) // Re-fetch om id ändras i URL

  if (loading) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Error loading post</h2>
        <p>{error}</p>
        <button onClick={fetchPost}>Try Again</button>
        <br />
        <Link to="/posts">← Back to Posts</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <h2>Post not found</h2>
        <Link to="/posts">← Back to Posts</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/posts">← Back to Posts</Link>
      <h1>Post Details</h1>

      <div>
        <Link to={`/posts/${id}/edit`}>
          <button>Edit Post</button>
        </Link>
        <button onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting...' : 'Delete Post'}
        </button>
      </div>

      <PostComponent post={post} />
    </div>
  )
}

export default Post