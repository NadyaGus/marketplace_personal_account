import type { ReactNode } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Container, Title } from '@mantine/core';

import { AdvertisementItem } from '@/entities/advertisement/ui/AdvertisementItem';

import type { AdvertisementPageResponse } from '../model/types';

export const AdvertisementsListPage = (): ReactNode => {
  const pageLoaderData = useLoaderData() as AdvertisementPageResponse;

  return (
    <Container maw={1280} px={'lg'}>
      <Title order={2}>Ваши объявления</Title>
      {pageLoaderData.data.map((item) => (
        <AdvertisementItem key={item.id} {...item} />
      ))}
      <button onClick={() => console.log(pageLoaderData.data)}>Click</button>
    </Container>
  );
};
