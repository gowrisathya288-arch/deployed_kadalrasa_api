import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend("re_iRkXWNmr_N8Y2kUUaRk3UB1buEtsQhASK");
const EMAIL_TO = "gowrisathya288@gmail.com";

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields required" });

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: EMAIL_TO,
      subject: `💬 New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ error: "Email failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
