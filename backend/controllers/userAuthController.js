const User = require('../models/userModel2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
const Usersignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
const Userlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const submitProject = async (req, res) => {
  const { 
    phoneNumber, companyName, projectName, projectType, projectPurpose, 
    techStack, referenceLinks, budget, deadline, additionalServices 
  } = req.body;

  try {
    const user = await User.findOne({ email: req.user.email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add project details to the user's account
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.companyName = companyName || user.companyName;

    user.projects.push({
      projectName,
      projectType,
      projectPurpose,
      techStack,
      referenceLinks,
      budget,
      deadline,
      additionalServices
    });

    await user.save();
    res.status(200).json({ message: 'Project details added successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { Usersignup, Userlogin , submitProject};
