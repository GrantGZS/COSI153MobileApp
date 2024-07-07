const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TrainingPlan = require('../models/TrainingPlan');

// Register a new user
exports.register = async (req, res) => {
  console.log('Register endpoint hit');
  const { username, password, height, weight, mode } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      height,
      weight,
      mode,
      trainingPlan: [] // Initialize with an empty array
    });
    console.log('New user info:', newUser);
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  console.log('Login endpoint hit');
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).populate('trainingPlan');
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    console.log('Generated token:', token);
    res.json({ token, trainingPlan: user.trainingPlan });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get user profile
exports.getProfile = async (req, res) => {
  console.log('Get profile endpoint hit');

  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = req.headers.authorization.split(' ')[1];
  console.log('Token received:', token);

  try {
    const decoded = jwt.verify(token, 'secretkey');
    console.log('Decoded token:', decoded);
    
    const user = await User.findById(decoded.id).populate('trainingPlan');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      username: user.username,
      height: user.height,
      weight: user.weight,
      mode: user.mode,
      trainingPlan: user.trainingPlan
    });
  } catch (error) {
    console.error('Error in getProfile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  console.log('Update profile endpoint hit');
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { height, weight, mode, trainingPlan } = req.body;

    user.height = height || user.height;
    user.weight = weight || user.weight;
    user.mode = mode || user.mode;
    user.trainingPlan= trainingPlan || user.trainingPlan;


    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error in updateProfile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
