import type { Advertisment } from '@/types';

import { APP_ROUTES } from '@/app/routers';
import { API_URL } from '@/shared/variables';

export const createAdvertisement = async (data: Partial<Advertisment>): Promise<Response | void> => {
  const response = await fetch(`${API_URL}${APP_ROUTES.advertisements.link}`, {
    body: JSON.stringify({
      createdAt: data.createdAt,
      imageUrl: data.imageUrl,
      name: data.name,
      price: data.price,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).catch((error) => {
    console.error(error);
  });

  return response;
};
