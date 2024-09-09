import type { Advertisment } from '@/types';

export interface AdvertisementPageResponse {
  data: Advertisment[];
  total: string;
}
