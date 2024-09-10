import type { ComboboxItem } from '@mantine/core';

import { type ReactNode, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

import { Container, Flex, Select, Title } from '@mantine/core';

import type { Order } from '@/types';

import { OrderCard } from '@/entities/order';

import { sortOrderValues } from '../types';

export const OrdersListPage = (): ReactNode => {
  const data = useLoaderData() as Order[];

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState<ComboboxItem | null>(null);

  const handleSort = (option: ComboboxItem): void => {
    setSortOrder(option);
    searchParams.set('sort', option.value);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <>
      <Container>
        <Title order={2}>Заказы</Title>

        <Select
          allowDeselect={false}
          data={[sortOrderValues.asc, sortOrderValues.desc]}
          defaultValue={sortOrder ? sortOrder.value : (searchParams.get('sort') ?? sortOrderValues.asc)}
          label="Сумма заказа"
          onChange={(_value, option) => handleSort(option)}
          value={sortOrder ? sortOrder.value : (searchParams.get('sort') ?? sortOrderValues.asc)}
        />

        <Flex direction={'column'}>
          {data.map((item) => (
            <OrderCard key={item.id} order={item} />
          ))}
        </Flex>
      </Container>
    </>
  );
};
