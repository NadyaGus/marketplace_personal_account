import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorPage } from '@/pages/errorPage/ui/ErrorPage';

export const Providers = ({ children }: { children: ReactNode }): ReactNode => {
  return <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>;
};
