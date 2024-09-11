import { sortOrderValues } from '../types';

export const getOrders = async ({ sort, status }: { sort: null | string; status: string[] }): Promise<Response> => {
  const statusString = status.map((id) => `status_ne=${id}`).join('&');

  if (sort === sortOrderValues.asc) {
    return await fetch(`http://localhost:3000/orders?_sort=total&_order=asc&${statusString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  }

  if (sort === sortOrderValues.desc) {
    return await fetch(`http://localhost:3000/orders?_sort=total&_order=desc&${statusString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  }

  return await fetch(`http://localhost:3000/orders?${statusString}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });
};
