import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

export const AdvertisementPage = (): ReactNode => {
  const params = useParams();

  // TODO: fetch data

  return <div>Объявление: {params.id}</div>;
};
