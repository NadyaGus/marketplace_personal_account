export const loaderAdvertisementsList = async (): Promise<Response> => {
  const response = await fetch('http://localhost:3000/advertisements?_page=1_per_page=100', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return response;
};
