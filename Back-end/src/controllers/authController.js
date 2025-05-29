import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// 生成JWT令牌
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '30d'
    });
};

// 用户注册
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // 检查用户是否已存在
        const userExists = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: '用户名或邮箱已被注册'
            });
        }
        
        // 创建用户 - 密码将由模型中间件自动加密
        const user = await User.create({
            username,
            email,
            password,
            role: 'author' // 修改默认角色为 author
        });
        
        // 生成令牌
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
            message: '注册失败',
            error: error.message
        });
    }
};

// 用户登录
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 查找用户
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: '邮箱或密码不正确'
            });
        }
        
        // 验证密码 - 只使用 bcrypt 加密方式
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: '邮箱或密码不正确'
            });
        }
        
        // 更新最后登录时间
        user.lastLogin = Date.now();
        await user.save();
        
        // 生成令牌
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
            message: '登录失败',
            error: error.message
        });
    }
};

// 获取当前用户信息
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
            message: '获取用户信息失败',
            error: error.message
        });
    }
};

// 用户登出
export const logout = async (req, res) => {
    try {
        // JWT是无状态的，实际上不需要在服务器端"注销"
        // 真正的注销发生在客户端删除token
        // 但我们可以记录登出行为
        
        if (req.user) {
            // 可选：记录用户退出时间
            await User.findByIdAndUpdate(req.user.id, {
                lastActivity: Date.now()
            });
            
            // 可选：如果使用的是刷新令牌，可以将其加入黑名单
            // await BlacklistedToken.create({ token: req.body.refreshToken });
        }
        
        res.status(200).json({
            success: true,
            message: '已成功登出'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '登出失败',
            error: error.message
        });
    }
};