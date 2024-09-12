import type { Advertisment } from '@/types';

import { APP_ROUTES } from '@/app/routers';
import { API_URL } from '@/shared/variables';

// createdAt: string;
// /* Описание. */
// description?: string;
// /* Уникальный идентификатор. */
// id: string;
// /* Ссылка на изображение. */
// imageUrl?: string;
// /* Количество лайков. */
// likes: number;
// /* Название. */
// name: string;
// /* Цена. */
// price: number;
// /* Количество просмотров. */
// views: number;

export const createAdvertisement = async (data: Partial<Advertisment>): Promise<Response | void> => {
  const response = await fetch(`${API_URL}${APP_ROUTES.advertisements.link}`, {
    body: JSON.stringify({
      createdAt: data.createdAt ?? new Date().toISOString(),
      description: data.description ?? '',
      imageUrl: data.imageUrl ?? '',
      likes: data.likes ?? 0,
      name: data.name,
      price: data.price ? +data.price : 0,
      views: data.views ?? 0,
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
