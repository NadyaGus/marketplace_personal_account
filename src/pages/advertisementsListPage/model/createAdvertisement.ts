import type { Advertisement } from '@/entities/advertisement';

export const createAdvertisement = async (data: Partial<Advertisement>): Promise<Response | void> => {
  const response = await fetch('http://localhost:3000/advertisements', {
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
