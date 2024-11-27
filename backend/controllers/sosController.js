// backend/controllers/sosController.js
const nodemailer = require('nodemailer');

console.log("Reacher here");

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use your email service provider, e.g., Gmail
    auth: {
        user: process.env.EMAIL_USER || "kundusanglap02@gmail.com",  // Ensure these environment variables are set in .env
        pass: process.env.EMAIL_PASS || "Sanglap0410@",
    },
});

// Controller to handle the SOS email sending
const sendSOSEmail = async (req, res) => {
    const { email, location } = req.body; // Extract email and location from the request body

    // If email or location is missing, return an error
    if (!email || !location) {
        return res.status(400).json({ message: 'Email and location are required' });
    }

    // Prepare the email content with the user's location
    const message = `SOS! The user is located at: https://maps.google.com/?q=${location.latitude},${location.longitude}`;

    try {
        // Send email with the SOS message
        await transporter.sendMail({
            from: process.env.EMAIL_USER,  // Sender email
            to: email,                     // Recipient email
            subject: 'SOS Alert',          // Subject of the email
            text: message,                 // Message body
        });

        // If email is sent successfully, send success response
        res.status(200).json({ message: 'SOS email sent successfully' });
    } catch (error) {
        // Handle any errors during email sending
        console.error('Error sending SOS email:', error);
        res.status(500).json({ message: 'Error sending SOS email' });
    }
};

module.exports = { sendSOSEmail };
