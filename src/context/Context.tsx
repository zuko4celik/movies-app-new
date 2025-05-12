import React, { useEffect, createContext, useReducer, useRef } from 'react';
import type { Dispatch, JSX } from 'react';

import { useErrorBoundary } from 'react-error-boundary';

import getItems from '@/apis/getItems';
import { NUMBER_OF_ITEMS, CONTENT_TYPE, DELAY, MIN_SEARCH_CHARACTERS, QUERY_TYPE } from '@/constants/constantValues';
import { stateReducer } from '@/helpers';
import type { ContentType, QueryType } from '@/types';

import initialState from './constants';
import type { IAppContext, Context, ReducerAction } from './types';

const MoviesShowsContext = createContext<IAppContext>(initialState);
const MoviesShowsDispatchContext = createContext<Dispatch<ReducerAction>>(() => {});
let timer: ReturnType<typeof setTimeout> | null = null;

function MoviesShowsProvider({ children }: Context): JSX.Element {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { showBoundary } = useErrorBoundary();
  const abortControllerRef = useRef<AbortController | null>(null);
  const userToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!userToken) return;

    const queryType = state.search.length >= MIN_SEARCH_CHARACTERS ? QUERY_TYPE.SEARCH : QUERY_TYPE.TOP_RATED;
    dispatch({ type: 'SET_ACTIVE_QUERY_TYPE', activeQueryType: queryType });

    // Prevent calling api in time scope of 1s
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // The search is performed only when there are 3 or more characters in the search bar
    // It should be triggered only one second after the user has stopped typing
    if (queryType === QUERY_TYPE.SEARCH) {
      timer = setTimeout(() => getItemsDataAndClearTimer(queryType), DELAY);
    } // Prevent getting top 10 items multiple times if there are 2 or less characters in the search bar
    else if (queryType !== state.activeQueryType) {
      getItemsData(queryType);
    }
  }, [state.search, state.activeQueryType]);

  // Triggered on switching between tabs
  useEffect(() => {
    if (!userToken) return;

    getItemsData(state.activeQueryType);
  }, [state.contentType]);

  const getItemsData = (queryType: string): Promise<void> => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    dispatch({ type: 'SET_LOADING', loading: true });

    return getItems(queryType as QueryType, state.contentType as ContentType, state.search, signal)
      .then(({ results }) => {
        const items = queryType === QUERY_TYPE.TOP_RATED ? results.slice(0, NUMBER_OF_ITEMS) : results;

        if (state.contentType === CONTENT_TYPE.TV_SHOW) {
          dispatch({ type: 'SET_SHOWS', shows: items });
        } else {
          dispatch({ type: 'SET_MOVIES', movies: items });
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          showBoundary(error);
        }
      })
      .finally(() => {
        dispatch({ type: 'SET_LOADING', loading: false });
      });
  };

  const getItemsDataAndClearTimer = (queryType: string): Promise<void> =>
    getItemsData(queryType)
      .then(() => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      })
      .catch((error) => {
        showBoundary(error);
      });

  return (
    <MoviesShowsContext value={state}>
      <MoviesShowsDispatchContext value={dispatch}>{children}</MoviesShowsDispatchContext>
    </MoviesShowsContext>
  );
}

export { MoviesShowsContext, MoviesShowsDispatchContext, MoviesShowsProvider };
