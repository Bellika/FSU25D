import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  getProtectedData,
  refreshAccessToken
} from '../controllers/userController.js';

import { authenticateToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/rbacMiddleware.js';
import { loginLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

// Authentication routes
router.post('/login', loginLimiter, loginUser);
router.post('/logout', logoutUser);

// Protected route - requires JWT
router.get('/protected', authenticateToken, getProtectedData);

// CRUD routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
