import type { ComboboxItem } from '@mantine/core';

import { type ReactNode, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Container, Flex, Select, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { AdvertisementItem } from '@/entities/advertisement';
import { PaginationWidget } from '@/widgets/pagination';

import type { AdvertisementPageResponse } from '../types';

import { CreateAdvertisementModal } from './modal/CreateAdvertisementModal';

// import classes from './advertisementsListPage.module.css';

export const AdvertisementsListPage = (): ReactNode => {
  const pageLoaderData = useLoaderData() as AdvertisementPageResponse;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [valuePerPage, setValuePerPage] = useState<ComboboxItem | null>(null);

  const [opened, { close, open }] = useDisclosure(false);

  const handlePerPageSelectChange = (option: ComboboxItem): void => {
    setValuePerPage(option);
    searchParams.set('page', '1');
    searchParams.set('perPage', option.value);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <>
      <Container maw={1280} px={'lg'}>
        <Title order={2}>Ваши объявления</Title>
        <Flex>
          <Select
            allowDeselect={false}
            data={['10', '20', '30']}
            defaultValue="10"
            label="Объявлений на странице"
            onChange={(_value, option) => handlePerPageSelectChange(option)}
            value={valuePerPage ? valuePerPage.value : (searchParams.get('perPage') ?? '10')}
          />
          <Button onClick={open}>Создать новое объявление</Button>
        </Flex>
        {pageLoaderData.data.map((item) => (
          <AdvertisementItem key={item.id} {...item} />
        ))}
      </Container>

      <PaginationWidget pages={pageLoaderData.pages} />

      <CreateAdvertisementModal close={close} opened={opened} />
    </>
  );
};
