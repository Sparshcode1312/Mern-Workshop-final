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
router.post('/', async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;

    const errors = validateFields({ name, email, phoneNumber });
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    const newEnquiry = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      createdAt: new Date().toISOString()
    };

    global.enquiries = global.enquiries || [];
    global.enquiries.push(newEnquiry);

    console.log("step 4");

    return res.status(201).json({
      success: true,
      message: "Registration successful! We will contact you shortly.",
      data: newEnquiry
    });

  } catch (error) {
    console.error("ROUTE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});
module.exports = router;
