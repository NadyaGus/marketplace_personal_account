export const loaderAdvertisementList = async (): Promise<Response> => {
  const response = await fetch('http://localhost:3000/advertisements?_page=1', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return response;
};
