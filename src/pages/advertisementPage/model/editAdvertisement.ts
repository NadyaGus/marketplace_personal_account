import type { Advertisment } from '@/types';

export const editAdvertisement = async ({
  advertisement,
  id,
}: {
  advertisement: Partial<Advertisment>;
  id: string;
}): Promise<Response | void> => {
  return await fetch(`http://localhost:3000/advertisements/${id}`, {
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
