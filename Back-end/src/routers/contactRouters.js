/**
 * Contact Form Router
 *
 * This file demonstrates the use of Swagger/OpenAPI documentation annotations.
 *
 * ===== ABOUT SWAGGER DOCUMENTATION =====
 *
 * The extensive comment blocks with @swagger annotations are used to automatically generate
 * interactive API documentation. These are parsed by the Swagger/OpenAPI tools we've
 * integrated into the application.
 *
 * Benefits of these documentation comments:
 *
 * 1. Self-documenting API - The documentation is always in sync with the code
 * 2. Interactive testing - Developers can test endpoints directly from the documentation UI
 * 3. Improved developer experience - Frontend developers and API consumers can quickly
 *    understand how to use each endpoint
 * 4. Reduced onboarding time - New team members can get up to speed faster
 *
 * Access the generated documentation by visiting:
 * http://[your-api-url]/api-docs
 *
 * While these comment blocks may seem verbose, they provide significant value by ensuring
 * that our API is well-documented and easily understood. This follows best practices for
 * API development in professional environments.
 *
 * If you need to modify an endpoint, please remember to update the corresponding
 * Swagger documentation to keep it in sync with the implementation.
 */

import express from "express";
import nodemailer from "nodemailer";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { contactRules } from "../utils/validationRules.js";
import { contactLimiter } from "../middleware/securityMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit a contact form
 *     description: Send a message through the contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 description: Sender's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Sender's email address
 *                 example: john.doe@example.com
 *               subject:
 *                 type: string
 *                 description: Message subject
 *                 example: Website Inquiry
 *               message:
 *                 type: string
 *                 description: Message content
 *                 example: I would like to know more about your services.
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Message sent successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       429:
 *         description: Too many requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Too many requests. Please try again later.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error sending message. Please try again later.
 */
router.post(
  "/",
  contactLimiter(),
  validateRequest(contactRules.submit),
  async (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(req.body);
    try {
      // Check if email credentials are configured
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        // In development/testing, return success without sending email
        return res.status(200).json({
          success: true,
          message:
            "Message received (Note: Email not sent - credentials not configured)",
        });
      }

      // Create transporter only when we have credentials
      const transporter = nodemailer.createTransport({
        // Configure based on your email service provider
        service: "gmail", // or other service like 'outlook', 'yahoo', etc.
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
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
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
      };

      await transporter.sendMail(mailOptions);

      // Optional: Save contact information to database
      // const newContact = new Contact({ name, email, subject, message });
      // await newContact.save();

      res
        .status(200)
        .json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending contact form email:", error);
      res.status(500).json({
        success: false,
        message: "Error sending message. Please try again later.",
      });
    }
  }
);

export default router;
