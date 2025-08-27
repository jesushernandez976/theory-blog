import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import nodemailer from "nodemailer";
import https from "https";
import bodyParser from "body-parser";

const app = express();

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/webhooks", webhookRouter);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());
app.use(cors(process.env.CLIENT_URL));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});



app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});



// Email configuration - Uses environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: process.env.EMAIL_USER, // From .env file
        pass: process.env.EMAIL_PASS  // From .env file
    }
});

// Test email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Route to handle form submission
app.post('/send-email', async (req, res) => {
    try {
        const { name, phone, email, message, marketingConsent, dataConsent } = req.body;

        // Validate required fields
        if (!name || !phone || !email || !message || !dataConsent) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields and accept the data consent.'
            });
        }

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER, // From .env file
            to: process.env.EMAIL_TO,     // From .env file
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                
                <hr>
                <h3>Consent Information:</h3>
                <p><strong>Marketing Consent:</strong> ${marketingConsent ? 'Yes' : 'No'}</p>
                <p><strong>Data Processing Consent:</strong> ${dataConsent ? 'Yes' : 'No'}</p>
                <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});


app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port the ${PORT}`);
});
