export const loaderAdvertisementsList = async ({ request }: { request: Request }): Promise<Response> => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') ?? '1');

  const response = await fetch(`http://localhost:3000/advertisements?_page=${page}_per_page=100`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return response;
};
