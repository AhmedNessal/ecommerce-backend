import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw { statusCode: 400, message: 'All fields required' };
    const exists = await User.findOne({ email });
    if (exists) throw { statusCode: 400, message: 'Email in use' };
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw { statusCode: 400, message: 'All fields required' };
    const user = await User.findOne({ email });
    if (!user) throw { statusCode: 401, message: 'Invalid credentials' };
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw { statusCode: 401, message: 'Invalid credentials' };
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};