import { verifyToken } from '../utils/jwt.js';

export const authenticateToken = (req, res, next) => {
  // Read token from HTTP-only cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ success: false, error: 'Invalid or expired token' });
  }

  // Attach user info to request
  req.user = decoded;
  next();
};
