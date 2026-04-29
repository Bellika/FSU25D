import apiClient from './axiosConfig';

// ========================================
// GET - Hämta alla posts
// ========================================
export const getAllPosts = async () => {
  try {
    const response = await apiClient.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
};

// ========================================
// GET - Hämta en specifik post via ID
// ========================================
export const getPostById = async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch post ${id}: ${error.message}`);
  }
};

// ========================================
// POST - Skapa ny post
// ========================================
export const createPost = async (postData) => {
  try {
    const response = await apiClient.post('/posts', postData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
};

// ========================================
// PATCH - Uppdatera en post (partiell uppdatering)
// ========================================
export const updatePost = async (id, postData) => {
  try {
    const response = await apiClient.patch(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update post ${id}: ${error.message}`);
  }
};

// ========================================
// PUT - Ersätt en hel post
// ========================================
export const replacePost = async (id, postData) => {
  try {
    const response = await apiClient.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to replace post ${id}: ${error.message}`);
  }
};

// ========================================
// DELETE - Ta bort en post
// ========================================
export const deletePost = async (id) => {
  try {
    const response = await apiClient.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete post ${id}: ${error.message}`);
  }
};

// ========================================
// GET - Hämta posts från specifik användare
// ========================================
export const getPostsByUser = async (userId) => {
  try {
    const response = await apiClient.get('/posts', {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch posts for user ${userId}: ${error.message}`);
  }
};
