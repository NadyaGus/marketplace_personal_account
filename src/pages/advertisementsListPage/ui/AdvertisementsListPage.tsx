import type { ComboboxItem } from '@mantine/core';

import { type ReactNode, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Container, Flex, Select, TextInput, Title } from '@mantine/core';
import { useDebouncedCallback, useDisclosure } from '@mantine/hooks';

import { AdvertisementItem } from '@/entities/advertisement';
import { PaginationWidget } from '@/widgets/pagination';

import type { AdvertisementPageResponse } from '../types';

import { CreateAdvertisementModal } from './modal/CreateAdvertisementModal';

export const AdvertisementsListPage = (): ReactNode => {
  const pageLoaderData = useLoaderData() as AdvertisementPageResponse;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [itemsPerPage, setItemsPerPage] = useState<ComboboxItem | null>(null);

  const [searchValue, setSearchValue] = useState<string>(searchParams.get('q') ?? '');

  const [opened, { close, open }] = useDisclosure(false);

  const handlePerPageSelectChange = (option: ComboboxItem): void => {
    setItemsPerPage(option);
    searchParams.set('page', '1');
    searchParams.set('limit', option.value);
    navigate(`?${searchParams.toString()}`);
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    searchParams.set('q', value);
    navigate(`?${searchParams.toString()}`);
  }, 1000);

  return (
    <>
      <Container maw={1280} px={'lg'}>
        <Title order={2}>Ваши объявления</Title>
        <Flex>
          <TextInput
            onChange={(event) => {
              setSearchValue(event.currentTarget.value);
              debouncedSearch(event.currentTarget.value);
            }}
            placeholder="Поиск по названию"
            value={searchValue}
          />
          <Select
            allowDeselect={false}
            data={['10', '20', '30']}
            defaultValue={itemsPerPage ? itemsPerPage.value : (searchParams.get('limit') ?? '10')}
            label="Объявлений на странице"
            onChange={(_value, option) => handlePerPageSelectChange(option)}
            value={itemsPerPage ? itemsPerPage.value : (searchParams.get('limit') ?? '10')}
          />
          <Button onClick={open}>Создать новое объявление</Button>
        </Flex>
        {pageLoaderData.data.map((item) => (
          <AdvertisementItem key={item.id} {...item} />
        ))}
      </Container>

      <PaginationWidget pages={Math.ceil(+pageLoaderData.total / (Number(searchParams.get('limit')) ?? 10))} />

      <CreateAdvertisementModal close={close} opened={opened} />
    </>
  );
};
