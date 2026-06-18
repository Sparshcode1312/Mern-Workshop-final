/**
 * models/Enquiry.js - Mongoose schema/model for workshop enquiries
 * Stores registration form submissions from prospective students
 */

const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    // Student/parent full name
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },

    // Email address for communication
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      // RFC 5322 compliant email regex
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
    },

    // 10-digit Indian phone number
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[6-9]\d{9}$/,
        'Please provide a valid 10-digit Indian phone number',
      ],
    },

    // Status to track follow-up (default: pending)
    status: {
      type: String,
      enum: ['pending', 'contacted', 'enrolled', 'cancelled'],
      default: 'pending',
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Prevent duplicate email registrations
enquirySchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
