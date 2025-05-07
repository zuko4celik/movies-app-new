import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { CONTENT_TYPE, STATUS_CODES } from '@/constants/constantValues';
import { getData } from '@/helpers';

import getItem from './getItem';

jest.mock('@/helpers', () => ({
  getData: jest.fn(),
}));

const mockResponse: AxiosResponse = {
  data: { id: '123', title: 'Test Movie' },
  status: STATUS_CODES.OK,
  statusText: 'OK',
  headers: {},
  config: {} as InternalAxiosRequestConfig,
};

describe('getItem', () => {
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

  test('should call getData with correctly formatted URL', async () => {
    const contentType = CONTENT_TYPE.MOVIE;
    const id = '123';
    const expectedUrl = 'https://api.example.com/movie/123?api_key=test-api-key&append_to_response=videos';

    mockedGetData.mockResolvedValueOnce(mockResponse);

    await getItem(contentType, id);

    expect(mockedGetData).toHaveBeenCalledTimes(1);
    expect(mockedGetData).toHaveBeenCalledWith(expectedUrl);
  });

  test('should return the data from the response', async () => {
    mockedGetData.mockResolvedValueOnce(mockResponse);

    const result = await getItem(CONTENT_TYPE.MOVIE, '123');

    expect(result).toEqual({ id: '123', title: 'Test Movie' });
  });

  test('should return the error when getData rejects', async () => {
    const mockError = new Error('API Error');

    mockedGetData.mockRejectedValueOnce(mockError);

    const result = await getItem(CONTENT_TYPE.MOVIE, '123');

    expect(result).toEqual(mockError);
  });
});
