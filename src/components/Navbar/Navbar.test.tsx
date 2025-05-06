import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import ComponentWithContextMock from '@/__mocks__/ComponentWithContextMock';
import { CONTENT_TYPE, MOVIE_PLACEHOLDER, SHOW_PLACEHOLDER } from '@/constants/constantValues';
import initialState from '@/context/constants';
import stateReducer from '@/helpers/stateReducer';

import Navbar from './Navbar';

jest.mock('@/helpers/stateReducer', () => {
  const originalModule = jest.requireActual('@/helpers/stateReducer');
  return jest.fn(originalModule.default);
});
const mockedReducer = stateReducer as jest.MockedFunction<typeof stateReducer>;

describe('Navbar search box', () => {
  beforeEach(() => jest.clearAllMocks());

  test('initialy "contentType" is "tv" and should render search box with tv shows placeholder', () => {
    render(<ComponentWithContextMock component={<Navbar />} providedState={initialState} />);

    const searchBox = screen.getByPlaceholderText(`Search for ${SHOW_PLACEHOLDER}`);

    expect(searchBox).toBeInTheDocument();
  });

  test('should update placeholder text when switching between content types', async () => {
    render(<ComponentWithContextMock component={<Navbar />} providedState={initialState} />);

    // Initial state - shows content type
    const showsButton = screen.getByRole('button', { name: `${SHOW_PLACEHOLDER}s` });
    const moviesButton = screen.getByRole('button', { name: `${MOVIE_PLACEHOLDER}s` });

    // Initially, shows button should be active
    expect(showsButton).toHaveClass('active');
    expect(moviesButton).not.toHaveClass('active');

    // Switch to movies
    fireEvent.click(moviesButton);
    const movieSearchBox = await screen.findByPlaceholderText(`Search for ${MOVIE_PLACEHOLDER}`);
    expect(movieSearchBox).toBeInTheDocument();
    expect(moviesButton).toHaveClass('active');
    expect(showsButton).not.toHaveClass('active');

    // Switch back to shows
    fireEvent.click(showsButton);
    const showSearchBox = await screen.findByPlaceholderText(`Search for ${SHOW_PLACEHOLDER}`);
    expect(showSearchBox).toBeInTheDocument();
    expect(showsButton).toHaveClass('active');
    expect(moviesButton).not.toHaveClass('active');
  });

  test('should dispatch SET_SEARCH action when typing in search box', () => {
    render(<ComponentWithContextMock component={<Navbar />} providedState={initialState} />);

    const searchBox = screen.getByPlaceholderText(`Search for ${SHOW_PLACEHOLDER}`);
    fireEvent.change(searchBox, { target: { value: 'test search' } });

    const calls = mockedReducer.mock.calls;
    const searchAction = calls.find((call) => call[1] && 'type' in call[1] && call[1].type === 'SET_SEARCH');

    expect(searchAction).toBeTruthy();
    if (searchAction) {
      expect(searchAction[1]).toEqual({ type: 'SET_SEARCH', search: 'test search' });
    }
  });
});

describe('Navbar buttons', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should dispatch SET_CONTENT_TYPE action when content type is changed', () => {
    render(<ComponentWithContextMock component={<Navbar />} providedState={initialState} />);

    const moviesButton = screen.getByRole('button', {
      name: `${MOVIE_PLACEHOLDER}s`,
    });
    fireEvent.click(moviesButton);

    const calls = mockedReducer.mock.calls;
    const contentAction = calls.find((call) => call[1] && 'type' in call[1] && call[1].type === 'SET_CONTENT_TYPE');

    expect(contentAction).toBeTruthy();
    if (contentAction) {
      expect(contentAction[1]).toEqual({ type: 'SET_CONTENT_TYPE', contentType: CONTENT_TYPE.MOVIE });
    }
  });

  test('should render logout button always', () => {
    render(<ComponentWithContextMock component={<Navbar />} providedState={initialState} />);

    const logoutButton = screen.getByTestId('logout-btn');

    expect(logoutButton).toBeInTheDocument();
  });
});
