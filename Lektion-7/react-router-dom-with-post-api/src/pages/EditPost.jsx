import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPostById, updatePost } from '../api/postsApi';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const post = await getPostById(id);
        setFormData({
          title: post.title,
          body: post.body,
          userId: post.userId
        });

      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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
      setSaving(true);
      setError(null);

      const updatedPost = await updatePost(id, formData);
      console.log('Updated post:', updatedPost);
      alert('Post updated successfully!');

      navigate(`/posts/${id}`);

    } catch (error) {
      console.error(error);
      setError(error.message);
      alert(`Failed to update post: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/posts/${id}`);
  };

  if (loading) {
    return <div>Loading post...</div>;
  }

  if (error && !formData.title) {
    return (
      <div>
        <h2>Error loading post</h2>
        <p>{error}</p>
        <Link to="/posts">← Back to Posts</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to={`/posts/${id}`}>← Back to Post</Link>
      <h1>Edit Post #{id}</h1>

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
            disabled={saving}
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
            disabled={saving}
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
            disabled={saving}
            min="1"
          />
        </div>

        <div>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={handleCancel} disabled={saving}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
