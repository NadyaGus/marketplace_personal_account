import { createBrowserRouter } from 'react-router-dom';

import { AdvertisementPage } from '@/pages/advertisementPage';
import { AdvertisementsListPage } from '@/pages/advertisementsListPage';
import { loaderAdvertisementList } from '@/pages/advertisementsListPage/model/loaderAdvertisementList';
import { ErrorPage } from '@/pages/errorPage/ui/ErrorPage';
import { OrdersListPage } from '@/pages/ordersPage';

import { Layout } from '../layout';

export const APP_ROUTES = {
  advertisement: { label: 'Страница объявления', link: '/advertisements/:id' },
  allAdvertisements: { label: 'Объявления', link: '/advertisements' },
  orders: { label: 'Заказы', link: '/orders' },
  root: { label: 'Главная', link: '/' },
};

export const routes = [
  {
    children: [
      { element: <AdvertisementsListPage />, index: true, loader: loaderAdvertisementList },
      { element: <AdvertisementsListPage />, loader: loaderAdvertisementList, path: APP_ROUTES.allAdvertisements.link },
      { element: <AdvertisementPage />, path: APP_ROUTES.advertisement.link },
      { element: <OrdersListPage />, path: APP_ROUTES.orders.link },
    ],
    element: <Layout />,
    errorElement: <ErrorPage />,
    path: APP_ROUTES.root.link,
  },
];

export const router = createBrowserRouter(routes);
