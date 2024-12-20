import { ServerRoute, Request, ResponseToolkit } from '@hapi/hapi';
import { User } from '../models/User.js';
import jwt from '@hapi/jwt';

export const validateToken = async (decoded: any, request: Request, h: ResponseToolkit) => {
  try {
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: { user } };
  } catch (error) {
    return { isValid: false };
  }
};

export const authStrategy = {
  name: 'jwt',
  scheme: 'jwt',
  options: {
    keys: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    verify: {
      aud: false,
      iss: false,
      sub: false,
    },
    validate: validateToken,
  },
};

export const generateToken = (userId: string): string => {
  return jwt.token.generate(
    {
      id: userId,
    },
    {
      key: process.env.JWT_SECRET as string,
      algorithm: 'HS256',
    },
    {
      ttlSec: 14 * 24 * 60 * 60, // 14 days
    }
  );
};

export const auth: ServerRoute['options'] = {
  auth: {
    strategy: 'jwt',
    mode: 'required',
  },
};
