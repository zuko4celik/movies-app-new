import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import logout from '@/apis/logout';
import type { ILogin, ILoginState } from '@/pages/Account/Login/types';

interface IUseAuth {
  loginState: ILoginState;
  handleLoginResponse: (response: ILogin) => void;
  handleLogout: () => Promise<void>;
}

const useAuth = (): IUseAuth => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState<ILoginState>(() => {
    const accessToken = sessionStorage.getItem('accessToken') || null;
    const refreshToken = sessionStorage.getItem('refreshToken') || null;
    const expires = parseInt(sessionStorage.getItem('expires') || '0', 10) || null;

    return { accessToken, expires, refreshToken };
  });

  const handleLoginResponse = (response: ILogin): void => {
    const { accessToken, expires, refreshToken } = response;
    const newLoginState = { accessToken, expires: Date.now() + expires, refreshToken };

    sessionStorage.setItem('accessToken', newLoginState.accessToken);
    sessionStorage.setItem('expires', newLoginState.expires.toString());
    sessionStorage.setItem('refreshToken', newLoginState.refreshToken);

    setLoginState(newLoginState);
    navigate('/');
  };

  const handleLogout = async (): Promise<void> => {
    await logout();
    setLoginState({ accessToken: null, expires: null, refreshToken: null });

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('expires');
    sessionStorage.removeItem('refreshToken');

    navigate('/login');
  };

  return {
    loginState,
    handleLoginResponse,
    handleLogout,
  };
};

export default useAuth;
