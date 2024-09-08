import type { ReactNode } from 'react';

import type { Advertisement } from '../types';

export const AdvertisementItem = (item: Advertisement): ReactNode => {
  return <div>{item.name}</div>;
};
