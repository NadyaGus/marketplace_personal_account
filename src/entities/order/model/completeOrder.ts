import { type Order, OrderStatus } from '@/types';

export const completeOrder = async (order: Order): Promise<Response | void> => {
  return await fetch(`http://localhost:3000/orders/${order.id}`, {
    body: JSON.stringify({
      createdAt: order.createdAt,
      deliveryWay: order.deliveryWay,
      finishedAt: order.finishedAt,
      id: order.id,
      items: order.items,
      status: OrderStatus.Archived,
      total: order.total,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  }).catch((error) => {
    console.error(error);
  });
};
