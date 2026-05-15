import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId, username, role = 'user') => {
    return jwt.sign(
        { id: userId, username, role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
}

export const generateRefreshToken = (userId, username, role = 'user') => {
    return jwt.sign(
        { id: userId, username, role },
        process.env.JWT_SECRET || process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );
}


export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        return null;
    }
};

// Legacy support
export const generateToken = (userId, username, role = 'user') => {
  return generateAccessToken(userId, username, role)
};