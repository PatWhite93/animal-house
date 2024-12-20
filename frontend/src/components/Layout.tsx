import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  AppShell,
  Button,
  Stack,
  Title,
  Box,
  Text,
  Group,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';

export const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: true },
      }}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      <AppShell.Navbar p="md" styles={(theme) => ({ 
        navbar: {
          backgroundColor: theme.colors.blue[6],
          color: theme.white
        }
      })}>
        <Stack gap="md">
          <Title order={4} c="white" ta="center">
            Navigation 🧭
          </Title>
          <UnstyledButton
            component={Link}
            to="/"
            styles={(theme) => ({
              root: {
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.white,
                '&:hover': {
                  backgroundColor: theme.colors.blue[7],
                },
              }
            })}
          >
            Home 🏠
          </UnstyledButton>
          <UnstyledButton
            component={Link}
            to="/messages"
            styles={(theme) => ({
              root: {
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.white,
                '&:hover': {
                  backgroundColor: theme.colors.blue[7],
                },
              }
            })}
          >
            Messages 💭
          </UnstyledButton>
          {user && (
            <UnstyledButton
              onClick={handleLogout}
              styles={(theme) => ({
                root: {
                  display: 'block',
                  width: '100%',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color: theme.white,
                  '&:hover': {
                    backgroundColor: theme.colors.blue[7],
                  },
                }
              })}
            >
              Logout 👋
            </UnstyledButton>
          )}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Header p="md" styles={(theme) => ({
        header: {
          backgroundColor: theme.colors.yellow[2]
        }
      })}>
        <Group justify="space-between" h="100%">
          <Title
            order={2}
            styles={(theme) => ({
              root: {
                color: theme.colors.blue[7],
                fontFamily: 'Comic Sans MS, cursive',
              },
            })}
          >
            Animal House 🐾
          </Title>
          {user && (
            <Text c="dimmed" size="sm">
              Welcome, {user.username}! 👋
            </Text>
          )}
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
