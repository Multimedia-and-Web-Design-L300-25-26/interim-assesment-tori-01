const express = require('express');
const router = express.Router();
const { register, login, logout, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// POST /register - Create a new user account
router.post('/register', register);

// POST /login - Authenticate and receive JWT
router.post('/login', login);

// POST /logout - Clear auth cookie
router.post('/logout', protect, logout);

// GET /profile - Get current user's profile (protected)
router.get('/profile', protect, getProfile);

module.exports = router;
