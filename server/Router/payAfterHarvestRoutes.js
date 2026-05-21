// // payAfterHarvestRoutes.js
// const express = require("express");
// const router = express.Router();
// const nodemailer = require("nodemailer");

// const ADMIN_EMAIL = process.env.ADMIN_EMAIL;  // admin email
// const EMAIL_USER = process.env.EMAIL_USER;    // your SMTP email
// const EMAIL_PASS = process.env.EMAIL_PASS;    // app password / SMTP password

// router.post("/", async (req, res) => {
//   const {
//     name,
//     email,
//     phone,
//     itemType,
//     itemName,
//     price,
//     quantity,
//     rentDuration,
//     farmArea,
//     expectedPaymentDate,
//   } = req.body;

//   // Basic validation
//   if (!name || !email || !phone || !itemType || !itemName || !farmArea || !expectedPaymentDate) {
//     return res.status(400).json({ success: false, message: "All required fields must be filled" });
//   }

//   // Conditional validation
//   if ((itemType === "Seed" || itemType === "Warehouse") && !quantity) {
//     return res.status(400).json({ success: false, message: "Quantity / Size is required" });
//   }
//   if (itemType === "Machinery" && !rentDuration) {
//     return res.status(400).json({ success: false, message: "Rent duration is required" });
//   }

//   try {
//     // Create transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: { user: EMAIL_USER, pass: EMAIL_PASS },
//     });

//     // Admin email
//     const adminMailOptions = {
//       from: `"Farm App" <${EMAIL_USER}>`,
//       to: ADMIN_EMAIL,
//       subject: `New Pay After Harvest Reservation from ${name}`,
//       html: `
//         <h2>New Pay After Harvest Reservation</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Item Type:</strong> ${itemType}</p>
//         <p><strong>Item Name:</strong> ${itemName}</p>
//         ${quantity ? `<p><strong>Quantity / Size:</strong> ${quantity}</p>` : ""}
//         ${rentDuration ? `<p><strong>Rent Duration (days):</strong> ${rentDuration}</p>` : ""}
//         <p><strong>Farm Area:</strong> ${farmArea} acres</p>
//         <p><strong>Expected Payment / Harvest Date:</strong> ${expectedPaymentDate}</p>
//         ${price ? `<p><strong>Price / Rent:</strong> ₹${price}</p>` : ""}
//       `,
//     };

//     // Farmer email
//     const userMailOptions = {
//       from: `"Farm App" <${EMAIL_USER}>`,
//       to: email,
//       subject: `Reservation Confirmation - Pay After Harvest`,
//       html: `
//         <h2>Reservation Confirmed</h2>
//         <p>Dear ${name},</p>
//         <p>Your reservation for <strong>${itemName}</strong> (${itemType}) has been received.</p>
//         ${quantity ? `<p>Quantity / Size: ${quantity}</p>` : ""}
//         ${rentDuration ? `<p>Rent Duration: ${rentDuration} days</p>` : ""}
//         <p>Farm Area: ${farmArea} acres</p>
//         <p>Expected Payment / Harvest Date: ${expectedPaymentDate}</p>
//         <p>Price / Rent: ₹${price || "N/A"}</p>
//         <p>We will contact you if needed. Thank you for using Farm App!</p>
//       `,
//     };

//     // Send emails
//     await transporter.sendMail(adminMailOptions);
//     await transporter.sendMail(userMailOptions);

//     res.json({ success: true, message: "Reservation submitted successfully!" });
//   } catch (err) {
//     console.error("Pay After Harvest email error:", err);
//     res.status(500).json({ success: false, message: "Failed to submit reservation" });
//   }
// });

// module.exports = router;