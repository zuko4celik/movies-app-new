import React, { useEffect, createContext, useReducer, Dispatch } from 'react';

import getItems from '@/apis/getItems';
import { NUMBER_OF_ITEMS, CONTENT_TYPE, DELAY, MIN_SEARCH_CHARACTERS, QUERY_TYPE } from '@/constants/constantValues';
import initialState from '@/constants/initialState';
import stateReducer from '@/helpers/stateReducer';
import { ContentType, QueryType, ReducerAction } from '@/types/types';

import { IAppContext, Context } from './types';

const MoviesShowsContext = createContext<IAppContext>(initialState);
const MoviesShowsDispatchContext = createContext<Dispatch<ReducerAction>>(() => {});
let timer: ReturnType<typeof setTimeout> | null = null;

function MoviesShowsProvider({ children }: Context) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
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
    getItemsData(state.activeQueryType);
  }, [state.contentType]);

  const getItemsData = (queryType: string) =>
    getItems(queryType as QueryType, state.contentType as ContentType, state.search)
      .then(({ results }) => {
        const items = queryType === QUERY_TYPE.TOP_RATED ? results.slice(0, NUMBER_OF_ITEMS) : results;

        if (state.contentType === CONTENT_TYPE.TV_SHOW) {
          dispatch({ type: 'SET_SHOWS', shows: items });
        } else {
          dispatch({ type: 'SET_MOVIES', movies: items });
        }
      })
      .catch(() => {
        // TODO: Handle errors
      })
      .finally(() => {
        dispatch({ type: 'SET_LOADING', loading: false });
      });

  const getItemsDataAndClearTimer = (queryType: string) => {
    getItemsData(queryType)
      .then(() => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      })
      .catch(() => {
        // TODO: Handle errors
      });
  };

  return (
    <MoviesShowsContext.Provider value={state}>
      <MoviesShowsDispatchContext.Provider value={dispatch}>{children}</MoviesShowsDispatchContext.Provider>
    </MoviesShowsContext.Provider>
  );
}

export { MoviesShowsContext, MoviesShowsDispatchContext, MoviesShowsProvider };
