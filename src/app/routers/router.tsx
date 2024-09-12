import { createBrowserRouter } from 'react-router-dom';

import { AdvertisementPage } from '@/pages/advertisementPage';
import { loaderAdvertisementPage } from '@/pages/advertisementPage/model/loaderAdvertisementPage';
import { AdvertisementsListPage } from '@/pages/advertisementsListPage';
import { loaderAdvertisementsList } from '@/pages/advertisementsListPage/model/loaderAdvertisementsList';
import { ErrorPage } from '@/pages/errorPage/ui/ErrorPage';
import { OrdersListPage } from '@/pages/ordersPage';
import { loaderOrdersList } from '@/pages/ordersPage/model/loaderOrdersList';

import { Layout } from '../layout';

export const APP_ROUTES = {
  advertisement: { label: 'Страница объявления', link: '/advertisements/:id' },
  advertisements: { label: 'Объявления', link: '/advertisements' },
  orders: { label: 'Заказы', link: '/orders' },
  root: { label: 'Главная', link: '/' },
};

export const routes = [
  {
    children: [
      { element: <AdvertisementsListPage />, index: true, loader: loaderAdvertisementsList },
      {
        element: <AdvertisementsListPage />,
        loader: loaderAdvertisementsList,
        path: APP_ROUTES.advertisements.link,
      },
      { element: <AdvertisementPage />, loader: loaderAdvertisementPage, path: APP_ROUTES.advertisement.link },
      { element: <OrdersListPage />, loader: loaderOrdersList, path: APP_ROUTES.orders.link },
    ],
    element: <Layout />,
    errorElement: <ErrorPage />,
    path: APP_ROUTES.root.link,
  },
];

export const router = createBrowserRouter(routes);
