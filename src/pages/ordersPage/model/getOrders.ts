import { sortOrderValues } from '../types';

export const getOrders = async ({ request }: { request: Request }): Promise<Response> => {
  const url = new URL(request.url);
  const sort = url.searchParams.get('sort');

  if (sort === sortOrderValues.asc) {
    return await fetch(`http://localhost:3000/orders?_sort=total&_order=asc`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  }
  if (sort === sortOrderValues.desc) {
    return await fetch(`http://localhost:3000/orders?_sort=total&_order=desc`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  } else {
    return await fetch(`http://localhost:3000/orders`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  }
};
