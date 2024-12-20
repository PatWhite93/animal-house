import { ServerRoute } from '@hapi/hapi';
import { Message } from '../models/Message.js';
import { auth } from '../middleware/auth.js';
import { IUser } from '../types/index.js';

export const messageRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/api/messages',
    options: {
      ...auth,
      handler: async (request, h) => {
        try {
          const { content } = request.payload as { content: string };
          const user = request.auth.credentials.user as IUser;

          const message = new Message({
            content,
            author: user.id,
          });

          await message.save();
          await message.populate('author', 'username');

          return h.response(message).code(201);
        } catch (error) {
          return h.response({ message: 'Error creating message' }).code(500);
        }
      },
    },
  },
  {
    method: 'GET',
    path: '/api/messages',
    options: {
      ...auth,
      handler: async (request, h) => {
        try {
          const messages = await Message.find()
            .sort({ createdAt: -1 })
            .populate('author', 'username')
            .limit(50);

          return h.response(messages);
        } catch (error) {
          return h.response({ message: 'Error fetching messages' }).code(500);
        }
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/messages/{id}',
    options: {
      ...auth,
      handler: async (request, h) => {
        try {
          const user = request.auth.credentials.user as IUser;
          const messageId = request.params.id;

          const message = await Message.findById(messageId);
          if (!message) {
            return h.response({ message: 'Message not found' }).code(404);
          }

          // Check if user is the author
          if (message.author.toString() !== user.id) {
            return h.response({ message: 'Unauthorized' }).code(403);
          }

          await message.deleteOne();
          return h.response({ message: 'Message deleted' });
        } catch (error) {
          return h.response({ message: 'Error deleting message' }).code(500);
        }
      },
    },
  },
];
