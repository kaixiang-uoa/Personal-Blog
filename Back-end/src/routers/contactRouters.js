import express from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Create rate limiter - prevent API abuse
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // max 5 requests per IP per hour
  message: { error: 'Too many requests. Please try again later.' }
});

// Validation middleware
const validateContactForm = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  body('subject').trim().isLength({ min: 2 }).withMessage('Subject is required'),
  body('message').trim().isLength({ min: 5 }).withMessage('Message is required')
];

// Handle contact form submission
router.post('/', contactLimiter, validateContactForm, async (req, res) => {
  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, subject, message } = req.body;

  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      // In development/testing, return success without sending email
      return res.status(200).json({ 
        success: true, 
        message: 'Message received (Note: Email not sent - credentials not configured)'
      });
    }

    // Create transporter only when we have credentials
    const transporter = nodemailer.createTransport({
      // Configure based on your email service provider
      service: 'gmail', // or other service like 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Send email
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Use sender's name but system email account
      replyTo: email, // Set reply-to as the sender's email so admin can reply directly
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Admin email or fallback to sender
      subject: `Blog Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    // Optional: Save contact information to database
    // const newContact = new Contact({ name, email, subject, message });
    // await newContact.save();

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact form email:', error);
    res.status(500).json({ success: false, message: 'Error sending message. Please try again later.' });
  }
});

export default router;