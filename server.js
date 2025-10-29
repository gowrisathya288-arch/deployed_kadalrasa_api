import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

app.use(cors());
app.use(express.json());

// --------------------------------------
//  INSERT YOUR EMAIL + APP PASSWORD HERE
// --------------------------------------
const EMAIL_USER = "gowrisathya288@gmail.com";           // <-- your Gmail ID
const EMAIL_PASS = "dfry lgdg hbrm gpjq";  // <-- your Gmail App Password
const EMAIL_TO   = "gowrisathya288@gmail.com"; // You can use same as EMAIL_USER
// --------------------------------------

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
      from: email,
      to: EMAIL_TO,
      subject: `💬 New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ error: "Email sending failed" });
  }
});

app.get("/getdata", (req, res) => {
  res.json({
    message: "Contact API is working ✅"
  });
});


app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
