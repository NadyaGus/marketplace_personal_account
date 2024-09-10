import type { Advertisment } from '@/types';

export const editAdvertisement = async (
  data: Omit<Advertisment, 'createdAt' | 'likes' | 'views'>,
): Promise<Response | void> => {
  return await fetch(`http://localhost:3000/advertisements/${data.id}`, {
    body: JSON.stringify({
      description: data.description,
      id: data.id,
      imageUrl: data.imageUrl,
      name: data.name,
      price: data.price,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  }).catch((error) => {
    console.error(error);
  });
};
