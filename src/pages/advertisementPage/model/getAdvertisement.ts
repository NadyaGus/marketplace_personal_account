import type { Advertisment } from '@/types';

export const getAdvertisement = async ({ id }: { id: string }): Promise<Advertisment> => {
  const response = await fetch(`http://localhost:3000/advertisements/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  const data = (await response.json()) as Advertisment;

  return data;
};
