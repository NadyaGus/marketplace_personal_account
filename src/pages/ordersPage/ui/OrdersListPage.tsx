import type { ReactNode } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Container, Title } from '@mantine/core';

import type { Order } from '@/types';

export const OrdersListPage = (): ReactNode => {
  const data = useLoaderData() as Order[];
  console.log(data);

  return (
    <>
      <Container>
        <Title order={2}>Заказы</Title>
      </Container>
    </>
  );
};
