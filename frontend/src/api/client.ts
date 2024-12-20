import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  username: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export const api = {
  auth: {
    login: async (data: LoginData) => {
      const response = await client.post('/auth/login', data);
      return response.data;
    },
    register: async (data: RegisterData) => {
      const response = await client.post('/auth/register', data);
      return response.data;
    },
  },
  messages: {
    getAll: async () => {
      const response = await client.get<Message[]>('/messages');
      return response.data;
    },
    create: async (content: string) => {
      const response = await client.post<Message>('/messages', { content });
      return response.data;
    },
    delete: async (id: string) => {
      await client.delete(`/messages/${id}`);
    },
  },
};
