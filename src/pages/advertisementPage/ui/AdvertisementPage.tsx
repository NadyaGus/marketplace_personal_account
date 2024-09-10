import { type ReactNode } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Button, Container, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import type { Advertisment } from '@/types';

import { EditAdvertisementModal } from './modal/EditAdvertisementModal';

export const AdvertisementPage = (): ReactNode => {
  const data = useLoaderData() as Advertisment;

  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Container>
        <Flex>
          <Title order={2}>{data.name}</Title>
          <Button onClick={open}>Редактировать объявление</Button>
        </Flex>

        <Flex>
          <img alt={data.name} src={data.imageUrl} />
          <Container>
            <p>Цена: {data.price}</p>
            <p>Просмотры: {data.views}</p>
            <p>Нравится: {data.likes}</p>
          </Container>
        </Flex>
        <Title order={3}>Описание</Title>
        <p>{data.description}</p>
      </Container>
      <EditAdvertisementModal advertisement={data} close={close} opened={opened} />
    </>
  );
};
