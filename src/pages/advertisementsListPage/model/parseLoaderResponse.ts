import { z } from 'zod';

import type { AdvertisementPageResponse } from '../types';

export const parseLoaderResponse = (data: unknown): AdvertisementPageResponse => {
  const dataSchema = z.object({
    data: z.array(
      z.object({
        createdAt: z.string(),
        description: z.string().optional(),
        id: z.string(),
        imageUrl: z.string().optional(),
        likes: z.number(),
        name: z.string(),
        price: z.number() || z.string(),
        views: z.number(),
      }),
    ),
    total: z.string(),
  });

  const result = dataSchema.safeParse(data);

  if (result.error) {
    throw new Error('Failed to parse data');
  } else {
    return {
      data: result.data.data,
      total: result.data.total,
    };
  }
};
