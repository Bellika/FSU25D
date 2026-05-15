import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch users' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch user' });
    }
};

export const createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, error: 'Username and password are required' });
        }

        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(409).json({ success: false, error: 'Username already exists' });
        }

        const userRole = (req.user?.role === 'admin' && role === 'admin') ? 'admin' : 'user'
        const user = await User.create(username, password, userRole);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create user' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username) {
            return res.status(400).json({ success: false, error: 'Username is required' });
        }

        const existingUser = await User.findByUsername(username);
        if (existingUser && existingUser.id !== parseInt(req.params.id)) {
            return res.status(409).json({ success: false, error: 'Username already exists' });
        }

        const user = await User.update(req.params.id, username, password);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update user' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deleted = await User.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete user' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, error: 'Username and password are required' });
        }

        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const isValid = await User.verifyPassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Generate JWT token
        const accessToken = generateAccessToken(user.id, user.username, user.role)
        const refreshToken = generateRefreshToken(user.id, user.username, user.role)

        await User.updateRefreshToken(user.id, refreshToken)

        // Set JWT in HTTP-only cookie
        res.cookie('token', accessToken, {
            httpOnly: true, // Cannot be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production', // Only sent over HTTPS in production
            sameSite: 'lax', // CSRF protection
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('token', refreshToken, {
            httpOnly: true, // Cannot be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production', // Only sent over HTTPS in production
            sameSite: 'lax', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            success: true,
            data: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Login failed' });
    }
};

export const logoutUser = async (req, res) => {
    try {
        if (req.user?.id) {
            await User.clearRefreshToken(req.user.id)
        }

        // Clear the JWT cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Logout failed' });
    }
};

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookie

        if (!refreshToken) {
            return res.status(401).json({ success: false, error: 'Refresh token required'})
        }

        const decoded = verifyRefreshToken(refreshToken)
        if (!decoded) {
            return res.status(403).json({ success: false, error: 'Invalid refresh token'})
        }

        const user = await User.findByRefreshToken(refreshToken)
        if (!user) {
            return res.status(403).json({ success: false, error: 'Refresh token not found'})
        }

        const newAccessToken = generateAccessToken(user.id, user.username, user.role)
        const newRefreshToken = generateRefreshToken(user.id, user.username, user.role)

        await User.updateRefreshToken(user.id, newRefreshToken)

        // Set JWT in HTTP-only cookie
        res.cookie('token', newAccessToken, {
            httpOnly: true, // Cannot be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production', // Only sent over HTTPS in production
            sameSite: 'lax', // CSRF protection
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('token', newRefreshToken, {
            httpOnly: true, // Cannot be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production', // Only sent over HTTPS in production
            sameSite: 'lax', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            success: true,
            message: 'Token refreshed successfully',
            data: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
        
    } catch (error) {
        
    }
}

export const getProtectedData = async (req, res) => {
    try {
        // req.user is set by authenticateToken middleware
        res.json({
            success: true,
            message: 'This is protected data',
            data: {
                userId: req.user.id,
                username: req.user.username,
                secretInfo: 'You can only see this with a valid JWT token!',
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch protected data' });
    }
};
