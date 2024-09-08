export const getAdvertisementsList = async ({
  page,
  perPage = 10,
}: {
  page: number;
  perPage?: number;
}): Promise<Response> => {
  const response = await fetch(`http://localhost:3000/advertisements?_page=${page}&_per_page=${perPage}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return response;
};
