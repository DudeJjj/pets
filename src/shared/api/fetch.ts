import axios from "axios";

const API_BASE_URL = "https://872d9ebf615ee887.mokky.dev";

export const getCats = async (limit: number, page: number) => {
  const response = await axios.get(`${API_BASE_URL}/cats?page=${page}&limit=${limit}`,);
  return response.data;
};

export const getDogs = async (limit: number, page: number) => {
  const response = await axios.get(`${API_BASE_URL}/dogs?page=${page}&limit=${limit}`,);
  return response.data;
};

export const getOneCat = async (slug: string) => {
  const response = await axios.get(`${API_BASE_URL}/cats?slug=${slug}`);
  return response.data;
};

export const getOneDog = async (slug: string) => {
  const response = await axios.get(`${API_BASE_URL}/dogs?slug=${slug}`);
  return response.data;
};
