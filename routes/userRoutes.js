// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    console.log(req);
    
    // Extract headers set by KrakenD
  const ID = req.header('X-User-Id');
  const aa = req.header('Authorization');

  console.log('Received Headers:', {
    X_User_Email: ID,
    aa
  });
    const users = await User.find();
    res.status(200).json({users});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user by ID (name and phoneNo)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userName, phoneNo } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.userName = userName || user.userName;
    user.phoneNo = phoneNo || user.phoneNo;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
