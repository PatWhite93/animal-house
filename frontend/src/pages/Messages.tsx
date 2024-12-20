import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Container,
  Paper,
  Title,
  Text,
  Stack,
  TextInput,
  Button,
  Card,
  Group,
  ActionIcon,
} from '@mantine/core';
import { api, Message } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

export const Messages = () => {
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: api.messages.getAll,
  });

  const createMutation = useMutation({
    mutationFn: api.messages.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setNewMessage('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.messages.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      createMutation.mutate(newMessage);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Paper
          p="xl"
          radius="md"
          styles={(theme) => ({
            root: {
              backgroundColor: theme.colors.yellow[1],
              borderColor: theme.colors.yellow[6],
            },
          })}
        >
          <Title
            order={2}
            ta="center"
            styles={(theme) => ({
              root: {
                color: theme.colors.blue[7],
                fontFamily: 'Comic Sans MS, cursive',
                marginBottom: theme.spacing.md,
              },
            })}
          >
            Animal Chat Room 💭
          </Title>

          <form onSubmit={handleSubmit}>
            <Group>
              <TextInput
                placeholder="Share your thoughts..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ flex: 1 }}
                styles={{
                  input: { backgroundColor: 'white' },
                }}
              />
              <Button
                type="submit"
                loading={createMutation.isPending}
                styles={(theme) => ({
                  root: {
                    backgroundColor: theme.colors.blue[6],
                    '&:hover': {
                      backgroundColor: theme.colors.blue[7],
                    },
                  },
                })}
              >
                Post 📝
              </Button>
            </Group>
          </form>
        </Paper>

        <Stack gap="md">
          {isLoading ? (
            <Text ta="center">Loading messages... 🐾</Text>
          ) : messages.length === 0 ? (
            <Text ta="center">No messages yet. Be the first to post! 🎉</Text>
          ) : (
            messages.map((message: Message) => (
              <Card
                key={message.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                styles={(theme) => ({
                  root: {
                    backgroundColor: theme.colors.gray[0],
                  },
                })}
              >
                <Group justify="space-between" mb="xs">
                  <Text fw={500} size="sm" c="blue.7">
                    {message.author.username} 🐾
                  </Text>
                  <Group gap="xs">
                    <Text size="xs" c="dimmed">
                      {formatDate(message.createdAt)}
                    </Text>
                    {user?.id === message.author.id && (
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => deleteMutation.mutate(message.id)}
                        loading={deleteMutation.isPending}
                      >
                        🗑️
                      </ActionIcon>
                    )}
                  </Group>
                </Group>
                <Text size="sm">{message.content}</Text>
              </Card>
            ))
          )}
        </Stack>
      </Stack>
    </Container>
  );
};
