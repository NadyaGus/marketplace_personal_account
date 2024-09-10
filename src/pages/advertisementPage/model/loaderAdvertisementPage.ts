import type { Advertisment } from '@/types';

import { getAdvertisement } from './getAdvertisement';

export const loaderAdvertisementPage = async ({ request }: { request: Request }): Promise<Advertisment> => {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop()!;

  return await getAdvertisement({ id });
};
