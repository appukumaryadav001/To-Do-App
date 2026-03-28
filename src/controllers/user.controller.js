import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.utils.js';
import ApiError from '../utils/apiError.utils.js';


const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;


  if (!name || !email || !password) {
    throw new ApiError(400, 'Please provide name, email and password');
  }


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'Email already registered');
  }


  const user = await User.create({ name, email, password });


  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});


const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    throw new ApiError(400, 'Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }


  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});


const getMe = asyncHandler(async (req, res) => {
  
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

export { register, login, getMe };