const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30590419-c6ba1589c1309a9e3b7d1fa75';

export async function getImg(name, page = 1) {
  const param = new URLSearchParams({
    q: name,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });
  const getArray = await fetch(`${BASE_URL}?${param}`);
  const parsed = await getArray.json();

  return parsed;
}
