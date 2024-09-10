import type { Order } from '@/types';

export const getOrders = async (): Promise<Order[]> => {
  const response = await fetch('http://localhost:3000/orders', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const data = (await response.json()) as Order[];

  return data;
};
