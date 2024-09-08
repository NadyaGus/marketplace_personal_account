import { getAdvertisementsList } from './getAdvertisementsList';

export const loaderAdvertisementsList = async ({ request }: { request: Request }): Promise<Response> => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') ?? '1');
  const perPage = parseInt(url.searchParams.get('perPage') ?? '10');

  const response = await getAdvertisementsList({ page, perPage });

  return response;
};
