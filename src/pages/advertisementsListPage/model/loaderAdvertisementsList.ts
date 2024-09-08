import type { AdvertisementPageResponse } from '../types';

import { getAdvertisementsList } from './getAdvertisementsList';

export const loaderAdvertisementsList = async ({
  request,
}: {
  request: Request;
}): Promise<AdvertisementPageResponse> => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') ?? '1');
  const limit = parseInt(url.searchParams.get('limit') ?? '10');
  const search = url.searchParams.get('q') ?? '';

  const response = await getAdvertisementsList({ limit, page, search });

  return response;
};
