import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Gmail Credentials
const EMAIL_USER = "gowrisathya288@gmail.com"; // your Gmail
const EMAIL_PASS = "dfry lgdg hbrm gpjq";         // App Password (NOT normal password)
const EMAIL_TO = "gowrisathya288@gmail.com";   // where you want to receive emails

// 📩 Contact API
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      subject: `💬 New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    console.log("✅ Email sent successfully");
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("❌ Email Error:", err);
    res.status(500).json({ error: "Email sending failed" });
  }
});

// ✅ Test Route
app.get("/getdata", (req, res) => {
  res.json({ message: "Contact API is working ✅" });
});

// ✅ Use environment port for Render or 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
