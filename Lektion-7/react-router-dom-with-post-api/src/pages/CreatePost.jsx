import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPost } from '../api/postsApi';

function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.body.trim()) {
      alert('Title and body are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const newPost = await createPost(formData);
      console.log('Created post:', newPost);
      alert('Post created successfully!');

      navigate('/posts');

    } catch (error) {
      console.error(error);
      setError(error.message);
      alert(`Failed to create post: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/posts');
  };

  return (
    <div>
      <Link to="/posts">← Back to Posts</Link>
      <h1>Create New Post</h1>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            disabled={loading}
            rows="10"
            placeholder="Enter post content"
          />
        </div>

        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            disabled={loading}
            min="1"
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          <button type="button" onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
