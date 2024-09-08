import type { Advertisement } from '@/entities/advertisement';

export interface AdvertisementPageResponse {
  data: Advertisement[];
  total: string;
}
