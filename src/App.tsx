import React, { JSX } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';
import PrivateRoute from '@/components/PrivateRoute';
import { MoviesShowsProvider } from '@/context';
import Login from '@/pages/Account/Login';
import Registration from '@/pages/Account/Registration';
import RequestResetPassword from '@/pages/Account/RequestResetPassword';
import ResetPassword from '@/pages/Account/ResetPassword';
import Error from '@/pages/Error/Error';
import Home from '@/pages/Home';
import MovieOrShow from '@/pages/MovieOrShow';
import Unauthorized from '@/pages/Unauthorized';

import './App.css';

function App(): JSX.Element {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <MoviesShowsProvider>
        <Router>
          <Routes>
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path='/:content/:id'
              element={
                <PrivateRoute>
                  <MovieOrShow />
                </PrivateRoute>
              }
            />
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='/request-reset-password' element={<RequestResetPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </Router>
      </MoviesShowsProvider>
    </ErrorBoundary>
  );
}

export default App;
