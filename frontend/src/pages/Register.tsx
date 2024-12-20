import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Stack,
  Box,
} from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container size={420} my={40}>
      <Paper radius="md" p="xl" withBorder
        styles={(theme) => ({
          root: {
            backgroundColor: theme.colors.yellow[0],
            borderColor: theme.colors.yellow[6],
          }
        })}
      >
        <Title
          ta="center"
          styles={(theme) => ({
            root: {
              color: theme.colors.blue[7],
              fontFamily: 'Comic Sans MS, cursive',
              fontSize: '2rem',
            }
          })}
        >
          Join Animal House! 🎉
        </Title>
        <Text color="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#228be6', textDecoration: 'none' }}>
            Sign in
          </Link>
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack mt={30}>
            <TextInput
              label="Username"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              styles={{
                input: { backgroundColor: 'white' },
              }}
            />

            <TextInput
              label="Email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              styles={{
                input: { backgroundColor: 'white' },
              }}
            />

            <PasswordInput
              label="Password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              styles={{
                input: { backgroundColor: 'white' },
              }}
            />

            {error && (
              <Text color="red" size="sm">
                {error}
              </Text>
            )}

            <Button
              fullWidth
              mt="xl"
              type="submit"
              styles={(theme) => ({
                root: {
                  backgroundColor: theme.colors.blue[6],
                  '&:hover': {
                    backgroundColor: theme.colors.blue[7],
                  },
                }
              })}
            >
              Create account
            </Button>
          </Stack>
        </form>

        <Box mt={20}>
          <Text ta="center" size="sm" color="dimmed">
            Join our friendly community of animal friends! 🐶🐱🐰
          </Text>
        </Box>
      </Paper>
    </Container>
  );
};
