import { z } from 'zod';

import type { Advertisment } from '@/types';

export const parseAdvertisementsData = (data: unknown): Advertisment[] => {
  const schema = z.array(
    z.object({
      createdAt: z.string(),
      description: z.string().optional(),
      id: z.string(),
      imageUrl: z.string().optional(),
      likes: z.number(),
      name: z.string(),
      price: z.number(),
      views: z.number(),
    }),
  );

  const result = schema.safeParse(data);

  if (result.error) {
    console.log(result.error);
    throw new Error('Failed to parse data');
  } else {
    return result.data;
  }
};
