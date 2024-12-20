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

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
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
          Welcome to Animal House! 🐾
        </Title>
        <Text color="dimmed" size="sm" ta="center" mt={5}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: '#228be6', textDecoration: 'none' }}>
            Create account
          </Link>
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack mt={30}>
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
              placeholder="Your password"
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
              Sign in
            </Button>
          </Stack>
        </form>

        <Box mt={20}>
          <Text ta="center" size="sm" color="dimmed">
            A place where animals come to socialize and make friends! 🦁🐯🐻
          </Text>
        </Box>
      </Paper>
    </Container>
  );
};
