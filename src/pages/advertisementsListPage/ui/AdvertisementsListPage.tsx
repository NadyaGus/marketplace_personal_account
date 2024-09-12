import type { ComboboxItem } from '@mantine/core';

import { type ReactNode, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Container, Flex, Select, TextInput, Title } from '@mantine/core';
import { useDebouncedCallback, useDisclosure } from '@mantine/hooks';

import { AdvertisementCard } from '@/entities/advertisement';
import { PaginationWidget } from '@/widgets/pagination';

import { parseLoaderResponse } from '../model/parseLoaderResponse';
import { CreateAdvertisementModal } from './modal/CreateAdvertisementModal';

export const AdvertisementsListPage = (): ReactNode => {
  const pageLoaderData = useLoaderData();
  const parsedData = parseLoaderResponse(pageLoaderData);
  const { data, total } = parsedData;

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
        <Title order={1} py={'lg'}>
          Ваши объявления
        </Title>
        <Flex direction={{ base: 'column', lg: 'row-reverse' }} gap={'lg'}>
          <Flex
            align={{ base: 'normal', lg: 'normal', md: 'end', sm: 'end' }}
            direction={{ base: 'column', lg: 'column', md: 'row', sm: 'row' }}
            gap={'lg'}
            pb={'sm'}
          >
            <Select
              allowDeselect={false}
              data={['10', '20', '30']}
              defaultValue={itemsPerPage ? itemsPerPage.value : (searchParams.get('limit') ?? '10')}
              label="Объявлений на странице"
              onChange={(_value, option) => handlePerPageSelectChange(option)}
              value={itemsPerPage ? itemsPerPage.value : (searchParams.get('limit') ?? '10')}
            />
            <TextInput
              flex={{ base: 0, lg: 0, md: 1, sm: 1 }}
              onChange={(event) => {
                setSearchValue(event.currentTarget.value);
                debouncedSearch(event.currentTarget.value);
              }}
              placeholder="Поиск по названию"
              value={searchValue}
            />
            <Button onClick={open}>Создать новое объявление</Button>
          </Flex>

          <Flex direction={'column'} gap={'lg'} w={'100%'}>
            {data.map((item) => (
              <AdvertisementCard item={item} key={item.id} />
            ))}
          </Flex>
        </Flex>

        <PaginationWidget pages={Math.ceil(+total / (Number(searchParams.get('limit')) || 10))} />
      </Container>

      <CreateAdvertisementModal close={close} opened={opened} />
    </>
  );
};
