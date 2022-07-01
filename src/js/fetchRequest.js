import axios from 'axios';

const API_KEY = '27830209-3f5c1f8822da29de83683a02e';
const BASE_LINK = 'https://pixabay.com/api/';

export const fetchImgsData = async (data, page) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: data,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  });

  return (await axios.get(`${BASE_LINK}?${searchParams}`)).data;
};
