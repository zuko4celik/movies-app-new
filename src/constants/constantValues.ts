export const IMAGE_PATH = 'https://image.tmdb.org/t/p/w300';
export const VIDEO_PATH = 'https://www.youtube.com/embed/';
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
export const ERROR_CODES = {
  RECORD_NOT_UNIQUE: 'RECORD_NOT_UNIQUE',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
};
export const STATUS_CODES = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};
export const MESSAGES = {
  EMAIL_MUST_BE_VALID: 'Email must be valid',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required',
  PASSWORDS_MUST_MATCH: 'Passwords must match',
  PASSWORD_INVALID_FORMAT:
    'Must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 special character, and 1 number',
  USER_CREATED: 'User is created successfully, please login.',
  USER_ALREADY_EXISTS: 'User with that email already exists.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  REFRESH_TOKEN_FAILED: 'Refresh token failed',
  REQUEST_RESET_PASSWORD_MESSAGE: 'Email for reseting password is sent to your mail address.',
  RESET_PASSWORD_MESSAGE: 'Password is changed. Please login with the new password.',
  GENERAL_ERROR_MESSAGE: 'Something went wrong. Please try again.',
};
export const REGISTRATION_FIELDS = [
  {
    id: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'First name',
    isRequired: false,
    autoComplete: 'true',
  },
  {
    id: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Last name',
    isRequired: false,
    autoComplete: 'true',
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Email address',
    isRequired: true,
    autoComplete: 'true',
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    isRequired: true,
    autoComplete: 'true',
  },
  {
    id: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm password',
    isRequired: true,
    autoComplete: 'false',
  },
];
