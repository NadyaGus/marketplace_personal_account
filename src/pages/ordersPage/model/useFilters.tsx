import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const filters = new Set<number>();
const initState = new URLSearchParams(window.location.search);

export const useFilters = (): {
  filters: Set<number>;
  handleFilter: (filter: number) => void;
} => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (initState.get('status_ne')) {
      searchParams
        .get('status_ne')!
        .split(',')
        .forEach((filter) => filters.add(Number(filter)));
    }
  }, [searchParams]);

  const handleFilter = (filter: number): void => {
    if (filters.has(filter)) {
      removeFilter(filter);
    } else {
      addFilter(filter);
    }

    searchParams.set('status_ne', `${Array.from(filters.values()).join(',')}`);
    searchParams.set('page', '1');
    navigate(`?${searchParams.toString()}`);
  };

  const addFilter = (filter: number): void => {
    filters.add(filter);
  };

  const removeFilter = (filter: number): void => {
    filters.delete(filter);
  };

  return { filters, handleFilter };
};
