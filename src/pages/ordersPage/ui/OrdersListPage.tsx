import type { ReactNode } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Container, Flex, Title } from '@mantine/core';

import type { Order } from '@/types';

import { OrderCard } from '@/entities/order';

export const OrdersListPage = (): ReactNode => {
  const data = useLoaderData() as Order[];

  return (
    <>
      <Container>
        <Title order={2}>Заказы</Title>

        <Flex direction={'column'}>
          {data.map((item) => (
            <OrderCard key={item.id} order={item} />
          ))}
        </Flex>
      </Container>
    </>
  );
};
