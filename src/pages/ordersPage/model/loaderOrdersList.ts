import { getOrders } from './getOrders';

export const loaderOrdersList = async ({ request }: { request: Request }): Promise<Response> => {
  const url = new URL(request.url);
  const sort = url.searchParams.get('sort');
  const statusString = url.searchParams.get('status_ne') ?? '';
  const status = statusString.split(',');

  const response = await getOrders({ sort, status });

  return response;
};
