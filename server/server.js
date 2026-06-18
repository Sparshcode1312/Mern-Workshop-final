/**
 * server.js - Main entry point for the Express backend server
 * AI & Robotics Summer Workshop Registration API
 * 
 * MongoDB fallback: If MONGO_URI is not set or connection fails,
 * the server falls back to a local JSON file store so the app
 * remains fully functional without a running MongoDB instance.
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────────────────────────

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Database Connection (with JSON fallback) ────────────────────────────────

global.useMongoose = false; // tracks which storage mode is active

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI || mongoURI.includes('localhost') || mongoURI.includes('127.0.0.1')) {
    // Try MongoDB, fall back gracefully
    try {
      const mongoose = require('mongoose');
      await mongoose.connect(mongoURI || 'mongodb://localhost:27017/workshop_db', {
        serverSelectionTimeoutMS: 3000, // fail fast
      });
      global.useMongoose = true;
      console.log('✅ MongoDB connected successfully');
    } catch (err) {
      console.warn('⚠️  MongoDB not available — using JSON file fallback (enquiries.json)');
      global.useMongoose = false;
    }
  } else {
    // Atlas URI provided — connect for real
    try {
      const mongoose = require('mongoose');
      await mongoose.connect(mongoURI);
      global.useMongoose = true;
      console.log('✅ MongoDB Atlas connected successfully');
    } catch (err) {
      console.error('❌ MongoDB Atlas connection error:', err.message);
      console.warn('⚠️  Falling back to JSON file store');
      global.useMongoose = false;
    }
  }
};

connectDB();

// ─── Routes ──────────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'AI & Robotics Workshop API is running',
    storage: global.useMongoose ? 'MongoDB' : 'JSON file fallback',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/enquiry', require('./routes/enquiry'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;
