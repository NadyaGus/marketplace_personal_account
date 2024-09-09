import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { Advertisment } from '@/types';

export const AdvertisementItem = (item: Advertisment): ReactNode => {
  return (
    <Link to={`/advertisements/${item.id}`}>
      <div>{item.name}</div>
    </Link>
  );
};
