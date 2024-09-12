import type { ComboboxItem } from '@mantine/core';

import { type ReactNode, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

import { Container, Grid, Select, Title } from '@mantine/core';

import { OrderCard } from '@/entities/order';
import { PaginationWidget } from '@/widgets/pagination';

import { parseOrdersResponse } from '../model/parseLoaderResponse';
import { sortOrderValues } from '../types';
import { Filters } from './filters/Filters';

export const OrdersListPage = (): ReactNode => {
  const response = useLoaderData();
  const parsedData = parseOrdersResponse(response);
  const { data, total } = parsedData;

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

        <PaginationWidget pages={Math.ceil(total / 12)} />
      </Container>
    </>
  );
};
