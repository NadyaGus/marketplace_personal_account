import type { ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Flex, TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

export const Search = (): ReactNode => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get('q') ?? '');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    if (!value) {
      searchParams.delete('q');
      navigate(`?${searchParams.toString()}`);
    }

    if (value.length < 3) {
      return;
    }

    searchParams.set('q', value);
    navigate(`?${searchParams.toString()}`);
  }, 1000);

  return (
    <Flex flex={{ base: 0, lg: 0, md: 1, sm: 1 }}>
      <TextInput
        onChange={(event) => {
          setSearchValue(event.currentTarget.value);
          debouncedSearch(event.currentTarget.value);
        }}
        placeholder="Поиск по названию"
        value={searchValue}
        w={'100%'}
      />
    </Flex>
  );
};
