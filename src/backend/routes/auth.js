const express = require('express');
const { generateToken } = require('../utils/auth');
const router = express.Router(); 
const User = require('../models/User');

router.get('/test', (req, res) => {
  res.json({ message: 'Auth route is working!' });
});

router.post('/register', async (req, res) => {
  try {
    console.log('=== REGISTRATION STARTED ===');
    console.log('Request body:', req.body);
    
    const { username, email, password } = req.body;

    console.log('Checking if user exists...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ error: "User already exists" });
    }
  
    console.log('Creating new user...');
    const newUser = new User({ username, email, password });
    await newUser.save();
    console.log('User saved:', newUser._id);

  
    console.log('Generating token...');
    const token = generateToken(newUser._id);

    console.log('=== REGISTRATION COMPLETE ===');
    res.json({
      message: 'User created',
      token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email }
    });

  } catch (error) {
    console.error('REGISTRATION ERROR:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Request body:', req.body);
    
    const { email, password } = req.body;

    console.log('Finding user...');
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('Checking password...');
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('Password invalid');
      return res.status(400).json({ error: 'Invalid credentials' });
    }


    console.log('Generating token...');
    const token = generateToken(user._id);

    console.log('=== LOGIN SUCCESSFUL ===');
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, email: user.email } 
    });

  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

module.exports = router;