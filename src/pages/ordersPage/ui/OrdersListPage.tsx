import type { ComboboxItem } from '@mantine/core';

import { type ReactNode, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

import { Container, Grid, Select, Title } from '@mantine/core';

import type { Order } from '@/types';

import { OrderCard } from '@/entities/order';

import { sortOrderValues } from '../types';
import { Filters } from './filters/Filters';

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
      <Container maw={1280} p={'lg'}>
        <Title order={1}>Заказы</Title>

        <Title order={4} pb={'lg'} pt={'lg'}>
          Статус:
        </Title>
        <Filters />

        <Select
          allowDeselect={false}
          data={[sortOrderValues.asc, sortOrderValues.desc]}
          defaultValue={searchParams.get('sort') ?? sortOrder?.value}
          label="Сумма заказа"
          onChange={(_value, option) => handleSort(option)}
          pb={'2rem'}
          pt={'2rem'}
          value={searchParams.get('sort')}
          w={200}
        />

        <Grid gutter={'lg'}>
          {data.map((item) => (
            <OrderCard key={item.id} order={item} />
          ))}
        </Grid>
      </Container>
    </>
  );
};
