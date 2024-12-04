import config from '../../config.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtKey);
    const { userId } = decoded;

    if (!token) {
      throw new Error('Authorization token not provided');
    }
    req.userId = userId;
    req.token = token;

    next();
  } catch (error) {
    console.error('Error authenticating user:', error.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
