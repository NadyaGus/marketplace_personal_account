import { type ReactNode, useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import { Loader, LoadingOverlay } from '@mantine/core';

import { Header } from '@/widgets/header';

import { APP_ROUTES } from '../routers';

import classes from './layout.module.css';

export const Layout = (): ReactNode => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log(navigation.state);
  }, [navigation.state]);

  return (
    <>
      <Header links={[APP_ROUTES.allAdvertisements, APP_ROUTES.orders]} />

      <LoadingOverlay loaderProps={{ children: <Loader /> }} pos={'fixed'} visible={navigation.state === 'loading'} />
      <main className={classes.main}>
        <Outlet />
      </main>

      <footer className={classes.footer}>Footer</footer>
    </>
  );
};
