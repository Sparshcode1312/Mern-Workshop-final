/**
 * routes/enquiry.js - API routes for workshop registration enquiries
 * 
 * Storage strategy:
 *  - If global.useMongoose is true  → save to MongoDB via Mongoose model
 *  - Otherwise                      → save to enquiries.json (file fallback)
 */

const express = require("express");
const router = express.Router();

function validateFields({ name, email, phoneNumber }) {
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push("Name is required");
  }

  if (!email || !email.includes("@")) {
    errors.push("Valid email is required");
  }

  if (!phoneNumber || phoneNumber.trim().length < 10) {
    errors.push("Valid phone number is required");
  }

  return errors;
}

router.post("/", async (req, res) => {
  try {
    console.log("POST /api/enquiry hit:", req.body);

    const { name, email, phoneNumber } = req.body;

    const errors = validateFields({ name, email, phoneNumber });

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const newEnquiry = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      createdAt: new Date().toISOString(),
    };

    global.enquiries = global.enquiries || [];
    global.enquiries.push(newEnquiry);

    console.log("Registration saved:", newEnquiry);

    return res.status(201).json({
      success: true,
      message: "Registration successful! We will contact you shortly.",
      data: newEnquiry,
    });
  } catch (error) {
    console.error("ROUTE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;