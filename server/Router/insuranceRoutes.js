const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

router.post("/", async (req, res) => {
  const { name, email, phone, crop, area, plan } = req.body;

  if (!name || !email || !phone || !crop || !area || !plan) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email service
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // timestamp
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Admin email
    const mailOptionsAdmin = {
      from: `"Farm Insurance App" <${EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: `New Insurance Application from ${name}`,
      html: `
        <h2>New Insurance Application</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
          <tr><th>Name</th><td>${name}</td></tr>
          <tr><th>Email</th><td>${email}</td></tr>
          <tr><th>Phone</th><td>${phone}</td></tr>
          <tr><th>Crop / Livestock</th><td>${crop}</td></tr>
          <tr><th>Farm Area</th><td>${area} acres</td></tr>
          <tr><th>Selected Plan</th><td>${plan}</td></tr>
          <tr><th>Submitted On</th><td>${submittedAt}</td></tr>
        </table>
      `,
    };

    // User confirmation email
    const mailOptionsUser = {
      from: `"Farm Insurance App" <${EMAIL_USER}>`,
      to: email, // user email from form
      subject: "Your Insurance Application Has Been Received",
      html: `
        <h2>Your Insurance Application Has Been Received</h2>
        <p>Dear ${name},</p>
        <p>Thank you for submitting your application. Here are the details:</p>
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
          <tr><th>Crop / Livestock</th><td>${crop}</td></tr>
          <tr><th>Farm Area</th><td>${area} acres</td></tr>
          <tr><th>Selected Plan</th><td>${plan}</td></tr>
          <tr><th>Submitted On</th><td>${submittedAt}</td></tr>
        </table>
        <p>Our admin will review your application and contact you shortly.</p>
        <p>Regards,<br/>Farm Insurance App Team</p>
      `,
    };

    // send both emails
    await transporter.sendMail(mailOptionsAdmin);
    await transporter.sendMail(mailOptionsUser);

    res.json({ success: true, message: "Application submitted successfully!" });
  } catch (err) {
    console.error("Insurance email error:", err);
    res.status(500).json({ success: false, message: "Failed to submit application" });
  }
});

module.exports = router;