import type { Advertisement } from '@/entities/advertisement';

export interface AdvertisementPageResponse {
  data: Advertisement[];
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
  prev: number;
}
