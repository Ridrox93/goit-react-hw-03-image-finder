import axios from 'axios';

const API_KEY = '39522726-97c4cbc537e3955cc385e620d';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  per_page: 12,
};

export const getImages = async (searchPhoto, page) => {
  const { data } = await axios.get(
    `?key=${API_KEY}&q=${searchPhoto}&page=${page}`
  );

  return data;
};
