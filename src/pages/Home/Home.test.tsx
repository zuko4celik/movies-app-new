import React from 'react';

import { render, screen } from '@testing-library/react';

import ComponentWithContextMock from '@/__mocks__/ComponentWithContextMock';
import movies from '@/__mocks__/moviesMock';
import shows from '@/__mocks__/showsMock';
import { CONTENT_TYPE } from '@/constants/constantValues';
import initialState from '@/context/constants';

import Home from './Home';

describe('Home component', () => {
  test('should render Navbar component always', () => {
    render(<ComponentWithContextMock component={<Home />} providedState={initialState} />);

    const navbarElement = screen.getByRole('navigation');

    expect(navbarElement).toBeInTheDocument();
  });

  test('should render loading indicator when context loading state is "true"', () => {
    render(
      <ComponentWithContextMock
        component={<Home />}
        providedState={{
          ...initialState,
          loading: true,
        }}
      />,
    );

    const loadingElement = screen.getByAltText('loading');

    expect(loadingElement).toBeInTheDocument();
  });

  test('should render grid with item cards when context loading state is "false" and shows data exists', async () => {
    render(
      <ComponentWithContextMock
        component={<Home />}
        providedState={{
          ...initialState,
          loading: false,
          shows: shows,
        }}
      />,
    );

    const gridContainer = screen.getByRole('region');
    expect(gridContainer).toBeInTheDocument();

    expect(screen.queryByAltText('loading')).not.toBeInTheDocument();

    const itemCards = screen.getAllByRole('link');
    expect(itemCards).toHaveLength(2);

    expect(screen.getByText('Test Show 1')).toBeInTheDocument();
    expect(screen.getByText('Test Show 2')).toBeInTheDocument();
  });

  test('should render grid with item cards when context loading state is "false" and movies data exists', async () => {
    render(
      <ComponentWithContextMock
        component={<Home />}
        providedState={{
          ...initialState,
          contentType: CONTENT_TYPE.MOVIE,
          loading: false,
          movies: movies,
        }}
      />,
    );

    const gridContainer = screen.getByRole('region');
    expect(gridContainer).toBeInTheDocument();

    expect(screen.queryByAltText('loading')).not.toBeInTheDocument();

    const itemCards = screen.getAllByRole('link');
    expect(itemCards).toHaveLength(2);

    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
  });
});
