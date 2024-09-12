import type { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Pagination } from '@mantine/core';

interface PaginationProps {
  pages: number;
}

export const PaginationWidget = (props: PaginationProps): ReactNode => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const handlePaginationChange = (page: number): void => {
    window.scrollTo(0, 0);
    searchParams.set('page', page.toString());
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <Pagination
      mt="sm"
      onChange={handlePaginationChange}
      pt={'lg'}
      total={props.pages}
      value={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
    />
  );
};
