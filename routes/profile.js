const express = require('express');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/profile
router.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Please log in first' });
  }

  try {
    const user = await User.findById(req.session.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/profile
router.put('/', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Please log in first' });
  }

  const { name, email, institute, phone, address, preferences, twoFactorEnabled } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.session.user._id,
      { name, email, institute, phone, address, preferences, twoFactorEnabled },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
