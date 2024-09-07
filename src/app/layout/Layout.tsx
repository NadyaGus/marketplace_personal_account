import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = (): ReactNode => {
  return (
    <>
      <header>Header</header>

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </>
  );
};
