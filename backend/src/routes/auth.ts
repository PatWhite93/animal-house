import { ServerRoute } from '@hapi/hapi';
import { User } from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import { ILoginCredentials, IRegisterCredentials } from '../types/index.js';

export const authRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/api/auth/register',
    options: {
      auth: false,
      handler: async (request, h) => {
        try {
          const { username, email, password } = request.payload as IRegisterCredentials;

          // Check if user already exists
          const existingUser = await User.findOne({ $or: [{ email }, { username }] });
          if (existingUser) {
            return h.response({ message: 'User already exists' }).code(400);
          }

          // Create new user
          const user = new User({ username, email, password });
          await user.save();

          // Generate token
          const token = generateToken(user.id);

          // Return user data without sensitive information
          const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          };

          return h.response({ token, user: userData }).code(201);
        } catch (error) {
          return h.response({ message: 'Error creating user' }).code(500);
        }
      },
    },
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    options: {
      auth: false,
      handler: async (request, h) => {
        try {
          const { email, password } = request.payload as ILoginCredentials;

          // Find user
          const user = await User.findOne({ email });
          if (!user) {
            return h.response({ message: 'Invalid credentials' }).code(401);
          }

          // Check password
          const isValid = await user.comparePassword(password);
          if (!isValid) {
            return h.response({ message: 'Invalid credentials' }).code(401);
          }

          // Generate token
          const token = generateToken(user.id);

          // Return user data without sensitive information
          const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          };

          return h.response({ token, user: userData });
        } catch (error) {
          return h.response({ message: 'Login failed' }).code(500);
        }
      },
    },
  },
];
