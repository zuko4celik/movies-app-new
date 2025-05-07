import { renderHook } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import logout from '@/apis/logout';

import useAuth from './useAuth';

jest.mock('react-router-dom');
jest.mock('@/apis/logout');

describe('useAuth custom hook', () => {
  const mockNavigate = jest.fn();
  const mockLogout = logout as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  describe('handleLoginResponse', () => {
    test('should store login credentials in sessionStorage', () => {
      const { result } = renderHook(() => useAuth());
      const mockLoginResponse = {
        accessToken: 'test-access-token',
        expires: 3600000, // 1 hour in milliseconds
        refreshToken: 'test-refresh-token',
      };

      result.current.handleLoginResponse(mockLoginResponse);

      expect(sessionStorage.getItem('accessToken')).toBe('test-access-token');
      expect(sessionStorage.getItem('refreshToken')).toBe('test-refresh-token');

      // Verify expires is set to current time + expires duration
      const storedExpires = sessionStorage.getItem('expires');
      expect(storedExpires).toBeTruthy();
      const expiresNumber = parseInt(storedExpires || '0', 10);
      expect(expiresNumber).toBeGreaterThan(Date.now());
      expect(expiresNumber).toBeLessThan(Date.now() + 3600000 + 1000);
    });
  });

  describe('handleLogout', () => {
    test('should clear sessionStorage and navigate to login page', async () => {
      sessionStorage.setItem('accessToken', 'test-token');
      sessionStorage.setItem('expires', '123456789');
      sessionStorage.setItem('refreshToken', 'test-refresh-token');

      const { result } = renderHook(() => useAuth());

      await result.current.handleLogout();

      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(sessionStorage.getItem('accessToken')).toBeNull();
      expect(sessionStorage.getItem('expires')).toBeNull();
      expect(sessionStorage.getItem('refreshToken')).toBeNull();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
