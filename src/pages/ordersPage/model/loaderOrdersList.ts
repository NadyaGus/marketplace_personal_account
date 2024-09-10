import type { Order } from '@/types';

import { getOrders } from './getOrders';

export const loaderOrdersList = async (): Promise<Order[]> => {
  const response = await getOrders();

  return response;
};
