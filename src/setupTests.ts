// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// TODO: Once the @testing-library/jest-dom lib is bumped to new major version remove line above and uncomment the line below
// import '@testing-library/jest-dom/jest-globals'

// Added to avoid warnings about React Router v7
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
