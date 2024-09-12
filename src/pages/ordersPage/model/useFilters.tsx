import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const filters = new Set<number>();
const initState = new URLSearchParams(window.location.search);

export const useFilters = (): {
  filters: Set<number>;
  handleFilter: (filter: number) => void;
} => {
  const [searchParams] = useSearchParams();
  const path = window.location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    filters.clear();
  }, [path]);

  useEffect(() => {
    if (initState.get('status_ne')) {
      const params = searchParams.get('status_ne') ?? '';

      if (params.length > 0) {
        params.split(',').forEach((filter) => filters.add(Number(filter)));
      }
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
