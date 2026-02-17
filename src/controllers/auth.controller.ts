import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../models/User';

const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign(
    { id: userId },
    secret,
    {expiresIn:expiresIn as jwt.SignOptions['expiresIn']}
  );
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await User.create({ email, password });
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};