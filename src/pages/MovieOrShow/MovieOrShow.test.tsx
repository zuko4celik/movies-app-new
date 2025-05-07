import React from 'react';

import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import movies from '@/__mocks__/moviesMock';
import shows from '@/__mocks__/showsMock';
import getItem from '@/apis/getItem';

import MovieOrShow from './MovieOrShow';

jest.mock('@/apis/getItem');
const mockGetItem = getItem as jest.Mock;

describe('MovieOrShow component', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should render loading state initially with back button', async () => {
    mockGetItem.mockReturnValue(new Promise(() => {}));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/tv/123']}>
          <Routes>
            <Route path='/:content/:id' element={<MovieOrShow />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    const loadingElement = screen.getByAltText('loading');
    expect(loadingElement).toBeInTheDocument();

    // Back button should still be visible even during loading
    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeInTheDocument();
  });

  test('should render a show item when API responds', async () => {
    mockGetItem.mockResolvedValue(shows[0]);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/tv/1']}>
          <Routes>
            <Route path='/:content/:id' element={<MovieOrShow />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Test Show 1')).toBeInTheDocument();
      expect(screen.getByText('Test overview')).toBeInTheDocument();
      expect(screen.getByText(/First Air Date: 2021-01-01\s+Last Air Date: 2021-12-01/)).toBeInTheDocument();
    });
  });

  test('should render a movie item when API responds', async () => {
    mockGetItem.mockResolvedValue(movies[0]);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/movie/1']}>
          <Routes>
            <Route path='/:content/:id' element={<MovieOrShow />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Test overview')).toBeInTheDocument();
      expect(screen.getByText('Release Date: 2021-01-01')).toBeInTheDocument();
    });
  });
});
