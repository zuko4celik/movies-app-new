import handleResponse from './handleResponse';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const data = await handleResponse<T>(response);

  return data;
};

export default getData;
