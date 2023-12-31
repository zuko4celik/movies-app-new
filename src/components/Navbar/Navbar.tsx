import React, { useContext, useState } from 'react';

import { CONTENT_TYPE, SHOW_PLACEHOLDER, MOVIE_PLACEHOLDER } from '@/constants/constantValues';
import { MoviesShowsContext } from '@/context/Context';
import { NavbarState } from '@/types/types';

import './Navbar.css';

export default function Navbar() {
  const { search, contentType, setSearch, setContentType } = useContext(MoviesShowsContext);
  const [navbarState, setNavbarState] = useState<NavbarState>({
    moviesActive: contentType === CONTENT_TYPE.MOVIE,
    showsActive: contentType === CONTENT_TYPE.TV_SHOW,
  });
  const searchContent = contentType === CONTENT_TYPE.TV_SHOW ? SHOW_PLACEHOLDER : MOVIE_PLACEHOLDER;

  // Handle content for tv shows or movies and change button style to active
  const handleContent = ({ currentTarget: { value } }: React.MouseEvent<HTMLButtonElement>) => {
    // Use value and set content to "tv" or "movie"
    setContentType(value);

    // Check content type on button you clicked and set it to the opposite value
    if (contentType !== value) {
      setNavbarState({
        moviesActive: !navbarState.moviesActive,
        showsActive: !navbarState.showsActive,
      });
    }
  };

  // Handle typing in search box and set it in context
  const onSearchChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const setButtonClassName = (content: boolean) => (content ? 'navbar-button-item active' : 'navbar-button-item');

  return (
    <div className='navbar-container'>
      <div className='navbar-buttons'>
        <button
          className={setButtonClassName(navbarState.showsActive)}
          value={CONTENT_TYPE.TV_SHOW}
          onClick={handleContent}
        >
          {`${SHOW_PLACEHOLDER}s`}
        </button>
        <button
          className={setButtonClassName(navbarState.moviesActive)}
          value={CONTENT_TYPE.MOVIE}
          onClick={handleContent}
        >
          {`${MOVIE_PLACEHOLDER}s`}
        </button>
      </div>
      <input id='search-box' placeholder={`Search for ${searchContent}`} value={search} onChange={onSearchChange} />
    </div>
  );
}
