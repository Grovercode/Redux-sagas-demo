const KEY = '?client_id=vso1n52i5tSd7jM0yAgAz-KvnF0E6b6rQrB3lpUlchE';
const URL = `https://api.unsplash.com/photos/`;

export const fetchUsers = () => {
  return fetch(`https://jsonplaceholder.typicode.com/users`).then((res) =>
    res.json()
  );
};

export const fetchImages = async (page) => {
  const response = await fetch(`${URL}${KEY}&per_page=3&page=${page}`);
  const data = await response.json();
  console.log('data = ', data);
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};

export const fetchImageStats = async (id) => {
  const response = await fetch(`${URL}/${id}/statistics${KEY}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};
