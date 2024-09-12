import type { Order } from '@/types';

export const sortOrderValues = {
  asc: 'Сначала меньше',
  desc: 'Сначала больше',
} as const;

export interface OrdersPageResponse {
  data: Order[];
  total: number;
}
