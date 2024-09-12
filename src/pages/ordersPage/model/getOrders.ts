import type { Order } from '@/types';

import type { OrdersPageResponse } from '../types';

import { sortOrderValues } from '../types';

export const getOrders = async ({
  page = 1,
  sort,
  status,
}: {
  page: number;
  sort: null | string;
  status: string[];
}): Promise<OrdersPageResponse> => {
  const statusString = status.map((id) => `status_ne=${id}`).join('&');

  if (sort === sortOrderValues.asc) {
    const response = await fetch(
      `http://localhost:3000/orders?_page=${page}&_limit=12&_sort=total&_order=asc&${statusString}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
    );

    const data = (await response.json()) as Order[];
    const total = Number(response.headers.get('X-Total-Count')) ?? 0;

    return { data, total };
  }

  if (sort === sortOrderValues.desc) {
    const response = await fetch(
      `http://localhost:3000/orders?_page=${page}&_limit=12&_sort=total&_order=desc&${statusString}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
    );

    const data = (await response.json()) as Order[];
    const total = Number(response.headers.get('X-Total-Count')) ?? 0;

    return { data, total };
  }

  const response = await fetch(`http://localhost:3000/orders?_page=${page}&_limit=12&${statusString}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const data = (await response.json()) as Order[];
  const total = Number(response.headers.get('X-Total-Count')) ?? 0;

  return { data, total };
};
