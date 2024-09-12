import type { Advertisment } from '@/types';

import { APP_ROUTES } from '@/app/routers';
import { API_URL } from '@/shared/variables';

import { parseAdvertisementData } from './parseAdvertisementData';

export const getAdvertisement = async ({ id }: { id: string }): Promise<Advertisment> => {
  const response = await fetch(`${API_URL}${APP_ROUTES.advertisements.link}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const data = (await response.json()) as unknown;

  return parseAdvertisementData(data);
};
