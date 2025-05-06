import React, { JSX, use, useState } from 'react';

import { CONTENT_TYPE, SHOW_PLACEHOLDER, MOVIE_PLACEHOLDER } from '@/constants/constantValues';
import { MoviesShowsContext, MoviesShowsDispatchContext } from '@/context';
import useAuth from '@/hooks/useAuth';

import './Navbar.css';
import type { INavbarActiveType } from './types';

export default function Navbar(): JSX.Element {
  const { handleLogout } = useAuth();
  const { search, contentType } = use(MoviesShowsContext);
  const dispatch = use(MoviesShowsDispatchContext);
  const [activeType, setActiveType] = useState<INavbarActiveType>({
    moviesActive: contentType === CONTENT_TYPE.MOVIE,
    showsActive: contentType === CONTENT_TYPE.TV_SHOW,
  });
  const searchContent = contentType === CONTENT_TYPE.TV_SHOW ? SHOW_PLACEHOLDER : MOVIE_PLACEHOLDER;

  // Handle content for tv shows or movies and change button style to active
  const handleContent = ({ currentTarget: { value } }: React.MouseEvent<HTMLButtonElement>): void => {
    // Use value and set content to "tv" or "movie"
    dispatch({ type: 'SET_CONTENT_TYPE', contentType: value });

    // Check content type on button you clicked and set it to the opposite value
    if (contentType !== value) {
      setActiveType({
        moviesActive: !activeType.moviesActive,
        showsActive: !activeType.showsActive,
      });
    }
  };

  // Handle typing in search box and set it in context
  const onSearchChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: 'SET_SEARCH', search: value });
  };

  const setButtonClassName = (content: boolean): string =>
    content ? 'navbar-button-item active' : 'navbar-button-item';

  return (
    <div className='navbar-container' role='navigation'>
      <div className='navbar-buttons'>
        <button
          className={setButtonClassName(activeType.showsActive)}
          value={CONTENT_TYPE.TV_SHOW}
          onClick={handleContent}
        >
          {`${SHOW_PLACEHOLDER}s`}
        </button>
        <button
          className={setButtonClassName(activeType.moviesActive)}
          value={CONTENT_TYPE.MOVIE}
          onClick={handleContent}
        >
          {`${MOVIE_PLACEHOLDER}s`}
        </button>
      </div>
      <input
        id='search-box'
        placeholder={`Search for ${searchContent}`}
        value={search}
        onChange={onSearchChange}
        aria-label={`Search for ${searchContent}`}
      />
      <button type='button' id='logout-btn' onClick={handleLogout} aria-label='Logout' data-testid='logout-btn'>
        <i className='fa fa-sign-out' aria-hidden='true'></i>
      </button>
    </div>
  );
}
