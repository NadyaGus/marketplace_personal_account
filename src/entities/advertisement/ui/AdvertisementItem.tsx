import type { ReactNode } from 'react';

import type { Advertisment } from '@/types';

export const AdvertisementItem = (item: Advertisment): ReactNode => {
  return <div>{item.name}</div>;
};
