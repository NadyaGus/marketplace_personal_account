import type { Advertisment } from '@/types';

import { APP_ROUTES } from '@/app/routers';
import { API_URL } from '@/shared/variables';

export const editAdvertisement = async ({
  advertisement,
  id,
}: {
  advertisement: Partial<Advertisment>;
  id: string;
}): Promise<Response | void> => {
  return await fetch(`${API_URL}${APP_ROUTES.advertisements.link}/${id}`, {
    body: JSON.stringify({
      createdAt: advertisement.createdAt ?? new Date().toISOString(),
      description: advertisement.description ?? '',
      imageUrl: advertisement.imageUrl ?? '',
      likes: advertisement.likes ?? 0,
      name: advertisement.name,
      price: advertisement.price,
      views: advertisement.views ?? 0,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  }).catch((error) => {
    console.error(error);
  });
};
