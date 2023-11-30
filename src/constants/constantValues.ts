export const API_KEY = process.env.REACT_APP_MOVIES_API_KEY;
export const API_BASE_URL = process.env.REACT_APP_MOVIES_API_BASE_URL;
export const IMAGE_PATH = 'https://image.tmdb.org/t/p/w300';
export const DEFAULT_IMAGE = 'https://moviemarker.co.uk/wp-content/uploads/NoPosterAvailable.jpg';
export const CONTENT_TYPE = {
  MOVIE: 'movie',
  TV_SHOW: 'tv',
} as const;
export const QUERY_TYPE = {
  TOP_RATED: 'TOP_RATED',
  SEARCH: 'SEARCH',
} as const;
export const SHOW_PLACEHOLDER = 'TV Show';
export const MOVIE_PLACEHOLDER = 'Movie';
export const DEFAULT_SEARCH_VALUE = '';
export const NUMBER_OF_ITEMS = 10;
export const MIN_SEARCH_CHARACTERS = 3;
export const DELAY = 1000;
