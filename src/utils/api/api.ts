import axios from 'axios';

export const { BASE_URL } = process.env;

export const http = axios.create({
  baseURL: BASE_URL,
});

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export type ConfigT = typeof defaultConfig;
export type HeadersT = typeof defaultConfig.headers;

const delay = () => new Promise((delayTime) => setTimeout(delayTime, 150));

export const getReq = async <T>(url: string, mockData: () => T): Promise<T> => {
  await delay();
  return mockData();
};

export const postReq = async <T, K>(
  url: string,
  payload: T,
  config = defaultConfig,
): Promise<K> => {
  const { data } = await http.post(url, payload, config);
  return data;
};

export const putReq = async <T, K>(url: string, payload: T, config = defaultConfig): Promise<K> => {
  const { data } = await http.put(url, payload, config);
  return data;
};

export const deleteReq = async <T>(url: string, config: any = defaultConfig): Promise<T> => {
  const { data } = await http.delete(url, config);
  return data;
};
