import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MantineProvider } from '@mantine/core';

import { ErrorPage } from '@/pages/errorPage/ui/ErrorPage';

import { themeMantine } from '../styles/theme';

export const Providers = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <MantineProvider theme={themeMantine}>{children}</MantineProvider>
    </ErrorBoundary>
  );
};
