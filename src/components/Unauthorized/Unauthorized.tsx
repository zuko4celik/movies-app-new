import React, { JSX, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { DELAY } from '@/constants/constantValues';

export default function Unauthorized(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/login', { replace: true });
    }, DELAY);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className='error'>
      <h1>Unauthorized Access</h1>
      <p>Redirecting to login page...</p>
    </div>
  );
}
