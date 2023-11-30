import convertKeysToCamelCase from './convertKeysToCamelCase';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 200) {
    const jsonResponse = await response.json();
    const normalizedResponse = convertKeysToCamelCase<T>(jsonResponse);

    return normalizedResponse;
  } else {
    throw new Error('Invalid response');
  }
};

export default handleResponse;
