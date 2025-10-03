require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const os = require("os");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

// Handle form submission
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, msg: "All fields are required." });
  }

  const msgFont = "normal";
  const headerColor = "#1e4671ff";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Letigo Contact Form" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Message from ${name}`,
    html: `
      <div style="font-family:'Segoe UI',Tahoma,Verdana,sans-serif;background:#f5f5f7;padding:20px;border-radius:12px">
        <h2 style="color:${headerColor};text-align:center;font-size:28px;margin-bottom:10px">📬 You've Got Mail! (New Contact Form Submission)</h2>
        <div style="background:#fff;padding:15px 20px;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.05)">
          <p style="margin:5px 0"><strong style="color:${headerColor}">Name:</strong> <span style="color:#333">${name}</span></p>
          <p style="margin:5px 0"><strong style="color:${headerColor}">Email:</strong> <span style="color:#333">${email}</span></p>
          <p style="margin:5px 0"><strong style="color:${headerColor}">Message:</strong></p>
          <p style="font-style:${msgFont};color:#555;line-height:1.6;padding-left:10px;border-left:3px solid ${headerColor}">
            ${message.replace(/\n/g,'<br>')}
          </p>
        </div>
        <hr style="border:none;border-top:2px dashed ${headerColor};margin:20px 0">
        <p style="font-size:.85em;color:#888;text-align:center">✨ This message was lovingly sent from your Letigo Contact Form ✨</p>
        <p style="font-size:.8em;color:#aaa;text-align:center;margin-top:5px">(P.S. You can totally reply to <span style="color:${headerColor}">${email}</span>)</p>
      </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, msg: "Message sent! We'll get back to you shortly." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Oops! Something went wrong." });
  }
});

// Helper: get local IP
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let iface of Object.values(interfaces)) {
    for (let i of iface) {
      if (i.family === "IPv4" && !i.internal) {
        return i.address;
      }
    }
  }
  return "localhost";
}

// Start server
app.listen(PORT, async () => {
  const localIP = getLocalIP();
  const url = `http://${localIP}:${PORT}`;
  console.log(`Server running at ${url}`);

  // Generate QR code
  try {
    const qr = await QRCode.toString(url, { type: 'terminal' });
    console.log("Scan this QR code to open the site on your phone:");
    console.log(qr);
  } catch (err) {
    console.error("Failed to generate QR code:", err);
  }
});
