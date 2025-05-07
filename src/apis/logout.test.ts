import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { STATUS_CODES } from '@/constants/constantValues';
import { postData } from '@/helpers';

import logout from './logout';

jest.mock('@/helpers', () => ({
  postData: jest.fn(),
}));

const mockResponse = {
  status: STATUS_CODES.OK,
  statusText: 'OK',
  headers: {},
  config: {} as InternalAxiosRequestConfig,
  data: undefined,
} as AxiosResponse;

const mockSessionStorage = {
  getItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

describe('logout', () => {
  const mockedPostData = postData as jest.MockedFunction<typeof postData>;
  const originalEnv = process.env;

  beforeEach(() => {
    // Setup environment variables
    process.env = {
      ...originalEnv,
      REACT_APP_MOVIES_API_DIRECTUS_URL: 'https://api.example.com',
    };

    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('should call postData with the correct URL and refresh token', async () => {
    const mockRefreshToken = 'test-refresh-token';
    mockSessionStorage.getItem.mockReturnValueOnce(mockRefreshToken);

    const expectedUrl = 'https://api.example.com/auth/logout';
    const expectedData = { refreshToken: mockRefreshToken };

    mockedPostData.mockResolvedValueOnce(mockResponse);

    await logout();

    expect(mockSessionStorage.getItem).toHaveBeenCalledWith('refreshToken');
    expect(mockedPostData).toHaveBeenCalledTimes(1);
    expect(mockedPostData).toHaveBeenCalledWith(expectedUrl, expectedData);
  });

  test('should use an empty string if refresh token is not found', async () => {
    mockSessionStorage.getItem.mockReturnValueOnce(null);

    const expectedUrl = 'https://api.example.com/auth/logout';
    const expectedData = { refreshToken: '' };

    mockedPostData.mockResolvedValueOnce(mockResponse);

    await logout();

    expect(mockSessionStorage.getItem).toHaveBeenCalledWith('refreshToken');
    expect(mockedPostData).toHaveBeenCalledTimes(1);
    expect(mockedPostData).toHaveBeenCalledWith(expectedUrl, expectedData);
  });

  test('should return the response from postData', async () => {
    mockSessionStorage.getItem.mockReturnValueOnce('test-refresh-token');

    mockedPostData.mockResolvedValueOnce(mockResponse);

    const result = await logout();

    expect(result).toEqual(mockResponse);
  });
});
