import type { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Pagination } from '@mantine/core';

interface PaginationProps {
  pages: number;
}

export const PaginationWidget = (props: PaginationProps): ReactNode => {
  const searchParams = useSearchParams();

  const navigate = useNavigate();
  const handlePaginationChange = (page: number): void => {
    const targetSearchParams = new URLSearchParams(location.search);
    targetSearchParams.set('page', page.toString());
    navigate(`?${targetSearchParams.toString()}`);
  };

  return (
    <Pagination
      mt="sm"
      onChange={handlePaginationChange}
      total={props.pages}
      value={searchParams[0].get('page') ? Number(searchParams[0].get('page')) : 1}
    />
  );
};
