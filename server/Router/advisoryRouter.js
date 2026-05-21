const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, crop, message } = req.body;

    // create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // admin email (you)
      subject: "🌱 New Advisory Request",
      html: `
        <h3>New Advisory Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Crop:</b> ${crop}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    // send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Request sent to admin successfully!",
    });

  } catch (err) {
    console.error("Email error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

module.exports = router;