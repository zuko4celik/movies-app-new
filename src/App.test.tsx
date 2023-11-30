import React from 'react';

import { render, screen } from '@testing-library/react';

import getItems from '@/apis/getItems';

import App from './App';

jest.mock('@/apis/getItems');

describe('App component', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should render image alt content', async () => {
    (getItems as jest.Mock).mockResolvedValue({
      results: [{ name: 'spiderman' }],
    });
    render(<App />);
    const gifElement = screen.getByAltText(/loading/i);

    expect(gifElement).toBeInTheDocument();
  });
});
