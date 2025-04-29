import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Protect routes - verify if the user is logged in
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from request header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, please log in');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user information
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token invalid', error);
  }
});

// Restrict access by role
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error('You do not have permission to perform this action');
    }
    next();
  };
};