const express = require("express");
require("dotenv").config()
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const passwordRoutes = require("./routes/passwordRoutes.js");
const subscriptionRoutes = require('./routes/subscriptionRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js');
const cookieParser = require("cookie-parser");
const session = require('express-session');

require('./config/passport.js')
const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'passopsecretkey',
  resave: false,
  saveUninitialized: true
}))

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/passwords", passwordRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 💻");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});