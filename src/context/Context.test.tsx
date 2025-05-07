import React, { useContext, JSX } from 'react';

import { render, screen, waitFor, act } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from 'react-error-boundary';

import moviesMock from '@/__mocks__/moviesMock';
import showsMock from '@/__mocks__/showsMock';
import getItems from '@/apis/getItems';
import { CONTENT_TYPE, DELAY, QUERY_TYPE } from '@/constants/constantValues';

import { MoviesShowsContext, MoviesShowsDispatchContext, MoviesShowsProvider } from './Context';

jest.mock('@/apis/getItems');
jest.useFakeTimers();

const mockGetItems = getItems as jest.Mock;

const TestConsumer = (): JSX.Element => {
  const state = useContext(MoviesShowsContext);
  const dispatch = useContext(MoviesShowsDispatchContext);

  return (
    <div>
      <div data-testid='state'>{JSON.stringify(state)}</div>
      <button
        data-testid='switch-content'
        onClick={() =>
          dispatch({
            type: 'SET_CONTENT_TYPE',
            contentType: state.contentType === CONTENT_TYPE.TV_SHOW ? CONTENT_TYPE.MOVIE : CONTENT_TYPE.TV_SHOW,
          })
        }
      >
        Switch Content Type
      </button>
      <input
        data-testid='search-input'
        value={state.search}
        onChange={(e) => dispatch({ type: 'SET_SEARCH', search: e.target.value })}
      />
    </div>
  );
};

const renderWithProvider = (ui: React.ReactElement): RenderResult => {
  return render(
    <ErrorBoundary fallback={<div>Error occurred</div>}>
      <MoviesShowsProvider>{ui}</MoviesShowsProvider>
    </ErrorBoundary>,
  );
};

describe('MoviesShowsProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItems.mockResolvedValue({
      results: showsMock,
    });
  });

  test('should provide initial state', async () => {
    renderWithProvider(<TestConsumer />);

    await waitFor(() => {
      expect(mockGetItems).toHaveBeenCalledTimes(1);
      expect(mockGetItems).toHaveBeenCalledWith(QUERY_TYPE.TOP_RATED, CONTENT_TYPE.TV_SHOW, '');
    });

    const stateElement = screen.getByTestId('state');
    const state = JSON.parse(stateElement.textContent as string);

    expect(state.contentType).toBe(CONTENT_TYPE.TV_SHOW);
    expect(state.activeQueryType).toBe(QUERY_TYPE.TOP_RATED);
    expect(state.search).toBe('');
  });

  test('should update shows when API returns data', async () => {
    renderWithProvider(<TestConsumer />);

    await waitFor(() => {
      const stateElement = screen.getByTestId('state');
      const state = JSON.parse(stateElement.textContent as string);

      expect(state.shows.length).toBe(2);
      expect(state.shows[0].id).toBe(1);
      expect(state.shows[0].name).toBe('Test Show 1');
    });
  });

  test('should switch content type and fetch new data', async () => {
    mockGetItems.mockImplementation((queryType, contentType) => {
      if (contentType === CONTENT_TYPE.MOVIE) {
        return Promise.resolve({
          results: moviesMock,
        });
      }

      return Promise.resolve({
        results: showsMock,
      });
    });

    renderWithProvider(<TestConsumer />);

    // Wait for initial state
    await waitFor(() => {
      const stateElement = screen.getByTestId('state');
      const state = JSON.parse(stateElement.textContent as string);
      expect(state.shows.length).toBe(2);
    });

    const switchButton = screen.getByTestId('switch-content');
    await act(async () => {
      userEvent.click(switchButton);
    });

    // Verify content type is changed and API called with new content type
    await waitFor(() => {
      expect(mockGetItems).toHaveBeenCalledWith(QUERY_TYPE.TOP_RATED, CONTENT_TYPE.MOVIE, '');

      const stateElement = screen.getByTestId('state');
      const state = JSON.parse(stateElement.textContent as string);

      expect(state.contentType).toBe(CONTENT_TYPE.MOVIE);
      expect(state.movies.length).toBe(2);
      expect(state.movies[0].id).toBe(1);
      expect(state.movies[0].title).toBe('Test Movie 1');
    });
  });

  test('should handle search with debounce', async () => {
    renderWithProvider(<TestConsumer />);

    // Wait for initial API call to complete
    await waitFor(() => {
      expect(mockGetItems).toHaveBeenCalledTimes(1);
    });

    // Reset the mock counter to clearly see the search API call
    mockGetItems.mockClear();

    const searchInput = screen.getByTestId('search-input');

    act(() => {
      searchInput.focus();
      userEvent.type(searchInput, 'test query');
    });

    await waitFor(() => {
      const stateElement = screen.getByTestId('state');
      const state = JSON.parse(stateElement.textContent as string);
      expect(state.search).toBe('test query');
    });

    // Before advancing timer, API should not be called yet
    expect(mockGetItems).toHaveBeenCalledTimes(0);

    // Advance timers to trigger the debounced search
    act(() => {
      jest.advanceTimersByTime(DELAY);
    });

    await waitFor(() => {
      expect(mockGetItems).toHaveBeenCalledTimes(1);
      expect(mockGetItems).toHaveBeenCalledWith(QUERY_TYPE.SEARCH, CONTENT_TYPE.TV_SHOW, 'test query');
    });

    const stateElement = screen.getByTestId('state');
    const state = JSON.parse(stateElement.textContent as string);
    expect(state.activeQueryType).toBe(QUERY_TYPE.SEARCH);
  });
});
