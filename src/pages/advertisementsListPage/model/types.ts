import type { Advertisement } from '@/entities/advertisement';

export interface AdvertisementPageResponse {
  data: Advertisement[];
  first: number;
  items: number;
  last: number;
  next: null | number; // TODO: fix
  pages: number;
  prev: null | number; // TODO: fix
}
