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
      description: advertisement.description,
      id,
      imageUrl: advertisement.imageUrl,
      name: advertisement.name,
      price: advertisement.price,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  }).catch((error) => {
    console.error(error);
  });
};
