import type { ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';

import { Providers } from './providers';
import { router } from './routers';

import './styles/index.css';

function App(): ReactNode {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
