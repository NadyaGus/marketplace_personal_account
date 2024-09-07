import { createBrowserRouter } from 'react-router-dom';

import { AdvertisementPage } from '@/pages/advertisementPage';
import { AdvertisementsListPage } from '@/pages/advertisementsListPage';
import { ErrorPage } from '@/pages/errorPage/ui/ErrorPage';
import { OrdersListPage } from '@/pages/ordersPage';

import { Layout } from '../layout';

export const APP_ROUTES = {
  advertisement: '/advertisements/:id',
  allAdvertisements: '/advertisements',
  orders: '/orders',
  root: '/',
};

export const routes = [
  {
    children: [
      { element: <AdvertisementsListPage />, index: true },
      { element: <AdvertisementsListPage />, path: APP_ROUTES.allAdvertisements },
      { element: <AdvertisementPage />, path: APP_ROUTES.advertisement },
      { element: <OrdersListPage />, path: APP_ROUTES.orders },
    ],
    element: <Layout />,
    errorElement: <ErrorPage />,
    path: APP_ROUTES.root,
  },
];

export const router = createBrowserRouter(routes);
