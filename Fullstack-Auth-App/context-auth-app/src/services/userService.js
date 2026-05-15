import api from '../config/api';

export const userService = {
  // Login
  login: async (username, password) => {
    const response = await api.post('/users/login', { username, password });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/users/logout');
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post('/users/refresh')
    return response.data
  },

  // Get protected data (requires JWT)
  getProtectedData: async () => {
    const response = await api.get('/users/protected');
    return response.data;
  },

  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Create user
  createUser: async (username, password) => {
    const response = await api.post('/users', { username, password });
    return response.data;
  },

  // Update user
  updateUser: async (id, username, password) => {
    const response = await api.put(`/users/${id}`, { username, password });
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default userService;
