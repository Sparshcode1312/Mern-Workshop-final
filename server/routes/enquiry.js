/**
 * routes/enquiry.js - API routes for workshop registration enquiries
 * 
 * Storage strategy:
 *  - If global.useMongoose is true  → save to MongoDB via Mongoose model
 *  - Otherwise                      → save to enquiries.json (file fallback)
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path for the JSON fallback file (created automatically if absent)
const JSON_FILE = path.join(__dirname, '..', 'enquiries.json');

// ── JSON File Helpers ─────────────────────────────────────────────────────────

/** Read all enquiries from the JSON file */
const readJSON = () => {
  if (!fs.existsSync(JSON_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
  } catch {
    return [];
  }
};

/** Write enquiries array back to the JSON file */
const writeJSON = (data) => {
  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// ── Validation Helpers ────────────────────────────────────────────────────────

const validateFields = ({ name, email, phoneNumber }) => {
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('Name is required');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!email || email.trim() === '') {
    errors.push('Email is required');
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
    errors.push('Please provide a valid email address');
  }

  if (!phoneNumber || phoneNumber.trim() === '') {
    errors.push('Phone number is required');
  } else if (!/^[6-9]\d{9}$/.test(phoneNumber.trim())) {
    errors.push('Please provide a valid 10-digit Indian phone number');
  }

  return errors;
};

// ─────────────────────────────────────────────────────────────────────────────
/**
 * @route   POST /api/enquiry
 * @desc    Register a new workshop enquiry
 * @access  Public
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phoneNumber } = req.body;

    // Validate inputs
    const errors = validateFields({ name, email, phoneNumber });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const cleanName  = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phoneNumber.trim();

    // ── MongoDB path ──────────────────────────────────────────────────────────
    if (global.useMongoose) {
      const Enquiry = require('../models/Enquiry');
      const enquiry = new Enquiry({ name: cleanName, email: cleanEmail, phoneNumber: cleanPhone });
      await enquiry.save();

      return res.status(201).json({
        success: true,
        message: '🎉 Registration successful! We will contact you shortly.',
        data: { id: enquiry._id, name: enquiry.name, email: enquiry.email, createdAt: enquiry.createdAt },
      });
    }

    // ── JSON file fallback ────────────────────────────────────────────────────
    const existing = readJSON();

    // Check for duplicate email
    if (existing.some((e) => e.email === cleanEmail)) {
      return res.status(409).json({
        success: false,
        message: 'An enquiry with this email already exists. We will contact you shortly!',
      });
    }

    const newEntry = {
      id: `enq_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phoneNumber: cleanPhone,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    existing.push(newEntry);
    writeJSON(existing);

    return res.status(201).json({
      success: true,
      message: '🎉 Registration successful! We will contact you shortly.',
      data: { id: newEntry.id, name: newEntry.name, email: newEntry.email, createdAt: newEntry.createdAt },
    });

  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
/**
 * @route   GET /api/enquiry
 * @desc    Get all enquiries (admin use)
 * @access  Public (protect with auth in production)
 */
router.get('/', async (req, res, next) => {
  try {
    if (global.useMongoose) {
      const Enquiry = require('../models/Enquiry');
      const enquiries = await Enquiry.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
    }

    // JSON fallback
    const enquiries = readJSON().sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return res.status(200).json({ success: true, count: enquiries.length, data: enquiries });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
