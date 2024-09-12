import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Container, Title } from '@mantine/core';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import classes from './errorPage.module.css';

export const ErrorPage = (): ReactNode => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container className={classes.wrapper} maw={1280}>
        <Title order={1}>Произошла ошибка или страница не существует</Title>
        <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
      </Container>
      <Footer />
    </>
  );
};
