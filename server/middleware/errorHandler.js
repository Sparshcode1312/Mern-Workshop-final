/**
 * middleware/errorHandler.js - Global error handling middleware
 * Catches all unhandled errors and returns consistent JSON responses
 */

const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.stack || err.message);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages,
    });
  }

  // MongoDB duplicate key error (e.g., duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `An enquiry with this ${field} already exists. We will contact you shortly!`,
    });
  }

  // Mongoose CastError (invalid ObjectId etc.)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid data format provided',
    });
  }

  // Default 500 Internal Server Error
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error. Please try again later.',
  });
};

module.exports = errorHandler;
