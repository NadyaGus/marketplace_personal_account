import { getOrders } from './getOrders';

export const loaderOrdersList = async ({ request }: { request: Request }): Promise<Response> => {
  const response = await getOrders({ request });

  return response;
};
