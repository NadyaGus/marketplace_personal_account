import { getAdvertisementsList } from './getAdvertisemenstList';

export const loaderAdvertisementsList = async ({ request }: { request: Request }): Promise<Response> => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') ?? '1');

  const response = await getAdvertisementsList({ page });

  return response;
};
