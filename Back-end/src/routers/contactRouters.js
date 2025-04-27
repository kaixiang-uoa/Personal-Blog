const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

// 创建速率限制器 - 防止滥用API
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1小时
  max: 5, // 每个IP每小时最多5次请求
  message: { error: '提交次数过多，请稍后再试' }
});

// 验证中间件
const validateContactForm = [
  body('name').trim().isLength({ min: 2 }).withMessage('姓名至少需要2个字符'),
  body('email').trim().isEmail().withMessage('请提供有效的邮箱地址'),
  body('subject').trim().isLength({ min: 5 }).withMessage('主题至少需要5个字符'),
  body('message').trim().isLength({ min: 10 }).withMessage('消息至少需要10个字符')
];

// 配置邮件发送器
const transporter = nodemailer.createTransport({
  // 这里需要根据您的邮件服务提供商进行配置
  service: 'gmail', // 或其他服务
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 处理联系表单提交
router.post('/', contactLimiter, validateContactForm, async (req, res) => {
  // 检查验证结果
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, subject, message } = req.body;

  try {
    // 发送邮件
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // 管理员邮箱
      subject: `博客联系表单: ${subject}`,
      html: `
        <h3>新的联系表单提交</h3>
        <p><strong>姓名:</strong> ${name}</p>
        <p><strong>邮箱:</strong> ${email}</p>
        <p><strong>主题:</strong> ${subject}</p>
        <p><strong>消息:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    // 可选：将联系信息保存到数据库
    // const newContact = new Contact({ name, email, subject, message });
    // await newContact.save();

    res.status(200).json({ success: true, message: '消息已成功发送' });
  } catch (error) {
    console.error('发送联系表单邮件时出错:', error);
    res.status(500).json({ success: false, message: '发送消息时出错，请稍后再试' });
  }
});

module.exports = router;