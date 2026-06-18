/**
 * server.js - Main entry point for the Express backend server
 * AI & Robotics Summer Workshop Registration API
 * 
 * MongoDB fallback: If MONGO_URI is not set or connection fails,
 * the server falls back to a local JSON file store so the app
 * remains fully functional without a running MongoDB instance.
 */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage mode
global.useMongoose = false;

// Database connection
const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.warn("MongoDB URI not found — using memory/JSON fallback");
    global.useMongoose = false;
    return;
  }

  try {
    const mongoose = require("mongoose");
    await mongoose.connect(mongoURI);
    global.useMongoose = true;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.warn("Using memory/JSON fallback");
    global.useMongoose = false;
  }
};

connectDB();

// Health route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "AI & Robotics Workshop API is running",
    storage: global.useMongoose ? "MongoDB" : "Fallback",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/enquiry", require("./routes/enquiry"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;