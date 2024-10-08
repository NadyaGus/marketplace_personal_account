import { type ReactNode } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import { Loader, LoadingOverlay } from '@mantine/core';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import classes from './layout.module.css';

export const Layout = (): ReactNode => {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
      <LoadingOverlay
        loaderProps={{ children: <Loader /> }}
        pos={'fixed'}
        visible={navigation.state === 'loading'}
        zIndex={1}
      />
      <Footer />
    </>
  );
};
