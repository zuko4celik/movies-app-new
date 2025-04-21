import React, { JSX } from 'react';

import Unauthorized from '@/pages/Unauthorized';

import type { IPrivateRoute } from './types';

const PrivateRoute = ({ children }: IPrivateRoute): JSX.Element => {
  const accessToken = sessionStorage.getItem('accessToken');

  if (!accessToken) {
    return <Unauthorized></Unauthorized>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
