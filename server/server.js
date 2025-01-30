const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post("/api/auth/google", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Here you would typically:
    // 1. Check if user exists in your database
    // 2. Create user if they don't exist
    // 3. Create a session or JWT token

    res.json({
      user: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
