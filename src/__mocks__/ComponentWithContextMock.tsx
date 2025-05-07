import React, { JSX, useReducer } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { MoviesShowsContext, MoviesShowsDispatchContext } from '@/context';
import { IAppContext } from '@/context/types';
import { stateReducer } from '@/helpers';

type ContectMockProps = {
  component: JSX.Element;
  providedState: IAppContext;
};

export default function ComponentWithContextMock({ component, providedState }: ContectMockProps): JSX.Element {
  const [state, dispatch] = useReducer(stateReducer, providedState);

  return (
    <MoviesShowsContext value={state}>
      <MoviesShowsDispatchContext value={dispatch}>
        <BrowserRouter>{component}</BrowserRouter>
      </MoviesShowsDispatchContext>
    </MoviesShowsContext>
  );
}
