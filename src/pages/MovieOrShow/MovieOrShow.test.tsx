import React from 'react';

import { render, screen } from '@testing-library/react';

import getItem from '@/apis/getItem';

import MovieOrShow from './MovieOrShow';

jest.mock('@/apis/getItem');

describe('MovieOrShow component', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should render movie or show item when api responds', async () => {
    (getItem as jest.Mock).mockResolvedValue({
      results: [{ name: 'spiderman' }],
    });
    render(<MovieOrShow />);
    const gifElement = screen.getByAltText(/loading/i);

    expect(gifElement).toBeInTheDocument();

    // TODO: Check how to implement reading API mock response
    // await waitFor(() => {
    //   screen.getByText('spiderman');
    // });
  });
});
