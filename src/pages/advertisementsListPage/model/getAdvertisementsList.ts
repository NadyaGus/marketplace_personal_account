import type { Advertisment } from '@/types';

import type { AdvertisementPageResponse } from '../types';

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
    const response = await fetch(`http://localhost:3000/advertisements?_page=${page}&_limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    const data = (await response.json()) as Advertisment[];
    const total = response.headers.get('X-Total-Count') ?? '0';

    return { data, total };
  }

  const response = await fetch(`http://localhost:3000/advertisements?name_like=${search}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const data = (await response.json()) as Advertisment[];
  const total = data.length.toString();

  return { data, total };
};
