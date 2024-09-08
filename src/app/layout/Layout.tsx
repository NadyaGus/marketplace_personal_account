import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/header';

import { APP_ROUTES } from '../routers';

import classes from './layout.module.css';

export const Layout = (): ReactNode => {
  return (
    <>
      <Header links={[APP_ROUTES.allAdvertisements, APP_ROUTES.orders]} />

      <main className={classes.main}>
        <Outlet />
      </main>

      <footer className={classes.footer}>Footer</footer>
    </>
  );
};
