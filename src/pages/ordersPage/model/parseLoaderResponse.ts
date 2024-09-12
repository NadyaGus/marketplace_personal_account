import { z } from 'zod';

import type { OrdersPageResponse } from '../types';

export const parseOrdersResponse = (data: unknown): OrdersPageResponse => {
  const schema = z.object({
    data: z.array(
      z.object({
        createdAt: z.string(),
        deliveryWay: z.string(),
        finishedAt: z.string().optional(),
        id: z.string(),
        items: z.array(
          z.object({
            count: z.number(),
            createdAt: z.string(),
            description: z.string().optional(),
            id: z.string(),
            imageUrl: z.string().optional(),
            likes: z.number(),
            name: z.string(),
            price: z.number(),
            views: z.number(),
          }),
        ),
        status: z.union([
          z.literal(0),
          z.literal(1),
          z.literal(2),
          z.literal(3),
          z.literal(4),
          z.literal(5),
          z.literal(6),
        ]),
        total: z.number(),
      }),
    ),
    total: z.number(),
  });

  const result = schema.safeParse(data);

  if (result.error) {
    throw new Error('Failed to parse data');
  } else {
    return {
      data: result.data.data,
      total: result.data.total,
    };
  }
};
