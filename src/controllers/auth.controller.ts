import { Request, Response } from 'express';
import jwt, {SignOptions} from 'jsonwebtoken';
import { User } from '../models/User';

const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn: string = process.env.JWT_EXPIRES_IN ?? '7d';

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const options: SignOptions = {
  expiresIn: expiresIn as SignOptions['expiresIn'],
};

  return jwt.sign({ id: userId }, secret, options);
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password });

    const token = generateToken(user.id);

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};