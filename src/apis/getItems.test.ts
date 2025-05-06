import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { CONTENT_TYPE, QUERY_TYPE, STATUS_CODES } from '@/constants/constantValues';
import { getData } from '@/helpers';

import getItems from './getItems';

jest.mock('@/helpers', () => ({
  getData: jest.fn(),
}));

const mockResponse: AxiosResponse = {
  data: { results: [{ id: '123', title: 'Test Movie' }] },
  status: STATUS_CODES.OK,
  statusText: 'OK',
  headers: {},
  config: {} as InternalAxiosRequestConfig,
};

describe('getItems', () => {
  const mockedGetData = getData as jest.MockedFunction<typeof getData>;
  const originalEnv = process.env;

  beforeEach(() => {
    // Setup environment variables
    process.env = {
      ...originalEnv,
      REACT_APP_MOVIES_API_BASE_URL: 'https://api.example.com/',
      REACT_APP_MOVIES_API_KEY: 'test-api-key',
    };

    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('should call getData with correctly formatted URL for TOP_RATED query type', async () => {
    const queryType = QUERY_TYPE.TOP_RATED;
    const contentType = CONTENT_TYPE.MOVIE;
    const search = '';
    const expectedUrl = 'https://api.example.com/movie/top_rated?api_key=test-api-key&language=en-US';

    mockedGetData.mockResolvedValueOnce(mockResponse);

    await getItems(queryType, contentType, search);

    expect(mockedGetData).toHaveBeenCalledTimes(1);
    expect(mockedGetData).toHaveBeenCalledWith(expectedUrl);
  });

  test('should call getData with correctly formatted URL for SEARCH query type', async () => {
    const queryType = QUERY_TYPE.SEARCH;
    const contentType = CONTENT_TYPE.MOVIE;
    const search = 'test movie';
    const expectedUrl = 'https://api.example.com/search/movie?api_key=test-api-key&language=en-US&query=test movie';

    mockedGetData.mockResolvedValueOnce(mockResponse);

    await getItems(queryType, contentType, search);

    expect(mockedGetData).toHaveBeenCalledTimes(1);
    expect(mockedGetData).toHaveBeenCalledWith(expectedUrl);
  });

  test('should return the data from the response', async () => {
    mockedGetData.mockResolvedValueOnce(mockResponse);

    const result = await getItems(QUERY_TYPE.TOP_RATED, CONTENT_TYPE.MOVIE, '');

    expect(result).toEqual({ results: [{ id: '123', title: 'Test Movie' }] });
  });

  test('should return the error when getData rejects', async () => {
    const mockError = new Error('API Error');

    mockedGetData.mockRejectedValueOnce(mockError);

    const result = await getItems(QUERY_TYPE.TOP_RATED, CONTENT_TYPE.MOVIE, '');

    expect(result).toEqual(mockError);
  });
});
