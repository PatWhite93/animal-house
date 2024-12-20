import React from 'react';
import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  ThemeIcon,
  List,
} from '@mantine/core';

export const Home = () => {
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
            ta="center"
            styles={(theme) => ({
              root: {
                color: theme.colors.blue[7],
                fontFamily: 'Comic Sans MS, cursive',
                fontSize: '2.5rem',
                marginBottom: theme.spacing.lg,
              },
            })}
          >
            Welcome to Animal House! 🏡
          </Title>
          <Text size="lg" ta="center" c="dimmed">
            A cozy corner of the internet where animals of all kinds come together to socialize,
            share stories, and make new friends! 🐾
          </Text>
        </Paper>

        <Group grow>
          <Paper
            p="xl"
            radius="md"
            styles={(theme) => ({
              root: {
                backgroundColor: theme.colors.blue[0],
                borderColor: theme.colors.blue[6],
              },
            })}
          >
            <Title order={3} c="blue.7" mb="md">
              What We Offer 🎯
            </Title>
            <List
              spacing="md"
              size="lg"
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  🌟
                </ThemeIcon>
              }
            >
              <List.Item>Connect with fellow animals</List.Item>
              <List.Item>Share your daily adventures</List.Item>
              <List.Item>Make new friendships</List.Item>
              <List.Item>Join fun discussions</List.Item>
            </List>
          </Paper>

          <Paper
            p="xl"
            radius="md"
            styles={(theme) => ({
              root: {
                backgroundColor: theme.colors.green[0],
                borderColor: theme.colors.green[6],
              },
            })}
          >
            <Title order={3} c="green.7" mb="md">
              Community Guidelines 📜
            </Title>
            <List
              spacing="md"
              size="lg"
              icon={
                <ThemeIcon color="green" size={24} radius="xl">
                  ✨
                </ThemeIcon>
              }
            >
              <List.Item>Be kind and respectful</List.Item>
              <List.Item>Share positive vibes</List.Item>
              <List.Item>Help others when you can</List.Item>
              <List.Item>Have fun and be yourself!</List.Item>
            </List>
          </Paper>
        </Group>

        <Paper
          p="xl"
          radius="md"
          styles={(theme) => ({
            root: {
              backgroundColor: theme.colors.pink[0],
              borderColor: theme.colors.pink[6],
            },
          })}
        >
          <Title order={3} c="pink.7" ta="center" mb="md">
            Ready to Join the Fun? 🎉
          </Title>
          <Text size="lg" ta="center" c="dimmed">
            Create an account or sign in to start connecting with other amazing animals!
            Share your stories, make friends, and be part of our wonderful community! 
            🦁🐯🐻🐨🦊🐸🐢🦜🐠
          </Text>
        </Paper>
      </Stack>
    </Container>
  );
};
