import React, { JSX } from 'react';

import type { FallbackProps } from 'react-error-boundary';

import './ErrorBoundaryFallback.css';

export default function ErrorBoundaryFallback({ resetErrorBoundary }: FallbackProps): JSX.Element {
  return (
    <div className='error-boundary-wrapper'>
      <h1>Something went wrong</h1>
      <button onClick={resetErrorBoundary}>Reload Page</button>
    </div>
  );
}
