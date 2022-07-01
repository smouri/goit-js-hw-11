import axios from 'axios';

const API_KEY = '28384952-cb198b155a0b3b70fc06988d8';
const BASE_LINK = 'https://pixabay.com/api/';

export const fetchImgsData = async(data, page) => {
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