import type { OrdersPageResponse } from '../types';

import { getOrders } from './getOrders';

export const loaderOrdersList = async ({ request }: { request: Request }): Promise<OrdersPageResponse> => {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') ?? '1';
  const sort = url.searchParams.get('sort');
  const statusString = url.searchParams.get('status_ne') ?? '';
  const status = statusString.split(',');

  const response = await getOrders({ page: +page, sort, status });

  return response;
};
