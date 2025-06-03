import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '30d'
    });
};

// user register
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // check if user already exists
        const userExists = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists'
            });
        }
        
        // create user - password will be automatically encrypted by model middleware
        const user = await User.create({
            username,
            email,
            password,
            role: 'author' // change default role to author
        });
        
        // generate token
        const token = generateToken(user._id);
        
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
};

// user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // find user
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email or password is incorrect'
            });
        }
        
        // verify password - only use bcrypt encryption
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Email or password is incorrect'
            });
        }
        
        // update last login time
        user.lastLogin = Date.now();
        await user.save();
        
        // generate token
        const token = generateToken(user._id);
        
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};

// get current user info
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get user info',
            error: error.message
        });
    }
};

// user logout
export const logout = async (req, res) => {
    try {
        // JWT is stateless, actually no need to "logout" on server side
        // real logout happens when client deletes token
        // but we can record logout behavior
        
        if (req.user) {
            // optional: record user logout time
            await User.findByIdAndUpdate(req.user.id, {
                lastActivity: Date.now()
            });
            
            // optional: if using refresh token, can add it to blacklist
            // await BlacklistedToken.create({ token: req.body.refreshToken });
        }
        
        res.status(200).json({
            success: true,
            message: 'Successfully logged out'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to logout',
            error: error.message
        });
    }
};