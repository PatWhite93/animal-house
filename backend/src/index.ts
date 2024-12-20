import Hapi from '@hapi/hapi';
import jwt from '@hapi/jwt';
import mongoose from 'mongoose';
import { authStrategy } from './middleware/auth.js';
import { authRoutes } from './routes/auth.js';
import { messageRoutes } from './routes/messages.js';
import dotenv from 'dotenv';

dotenv.config();

const init = async () => {
  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/animal-house');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }

  // Create Hapi server
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['http://localhost:5173'], // Vite default port
        credentials: true,
      },
    },
  });

  // Register JWT plugin
  await server.register(jwt);
  server.auth.strategy(authStrategy.name, authStrategy.scheme, authStrategy.options);
  server.auth.default(authStrategy.name);

  // Register routes
  server.route([...authRoutes, ...messageRoutes]);

  // Start server
  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (error) {
    console.error('Server start error:', error);
    process.exit(1);
  }

  // Handle shutdown
  process.on('SIGINT', async () => {
    console.log('Stopping server...');
    try {
      await server.stop();
      await mongoose.connection.close();
      console.log('Server stopped');
      process.exit(0);
    } catch (error) {
      console.error('Shutdown error:', error);
      process.exit(1);
    }
  });
};

init();
