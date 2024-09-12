import { APP_ROUTES } from '@/app/routers';
import { API_URL } from '@/shared/variables';

import type { AdvertisementPageResponse } from '../types';

import { parseAdvertisementsData } from './parseAdvertisementsData';

export const getAdvertisementsList = async ({
  limit = 10,
  page,
  search,
}: {
  limit?: number;
  page: number;
  search?: string;
}): Promise<AdvertisementPageResponse> => {
  if (!search) {
    const response = await fetch(`${API_URL}${APP_ROUTES.advertisements.link}?_page=${page}&_limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    const data = (await response.json()) as unknown;
    const parsedData = parseAdvertisementsData(data);

    const total = response.headers.get('X-Total-Count') ?? '0';

    return { data: parsedData, total };
  }

  const response = await fetch(`${API_URL}${APP_ROUTES.advertisements.link}?name_like=${search}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const data = (await response.json()) as unknown;
  const parsedData = parseAdvertisementsData(data);

  const total = parsedData.length.toString();

  return { data: parsedData, total };
};
