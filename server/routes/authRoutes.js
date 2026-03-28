const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Utility to generate token and return user
const createTokenAndSend = (user, res) => {
  if (!process.env.JWT_SECRET) {
    console.error('[v0] JWT_SECRET is not set!');
    return res.status(500).json({ error: 'Server configuration error: JWT_SECRET not set' });
  }
  
  try {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        _id: user._id
      }
    });
  } catch (err) {
    console.error('[v0] Token generation error:', err.message);
    res.status(500).json({ error: 'Failed to generate authentication token' });
  }
};

// — Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log('[v0] Register attempt:', { name, email });
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('[v0] Email already exists:', email);
      return res.status(400).json({ error: 'Email already in use' });
    }
    
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    console.log('[v0] User created successfully:', user._id);
    createTokenAndSend(user, res);
  } catch (err) {
    console.error('[v0] Register error:', err.message);
    res.status(500).json({ error: err.message || 'Server error during registration' });
  }
});

// — Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('[v0] Login attempt:', email);
    
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      console.log('[v0] User not found or no password:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      console.log('[v0] Password mismatch:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('[v0] Login successful:', email);
    createTokenAndSend(user, res);
  } catch (err) {
    console.error('[v0] Login error:', err.message);
    res.status(500).json({ error: err.message || 'Server error during login' });
  }
});

// — Google Login
router.post('/google-login', async (req, res) => {
  const { token: idToken } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const { name, email, sub: googleId } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, googleId });
    }

    createTokenAndSend(user, res);
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(400).json({ error: 'Google authentication failed' });
  }
});

// — Get Current User
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password -googleId');
    res.json(user);
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
