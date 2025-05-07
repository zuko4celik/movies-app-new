import { calculateAverageVote } from './';

describe('calculateAverageVoten helper', () => {
  test('calculate average vote', () => {
    const actual = calculateAverageVote(5.26);
    const expected = 5.3;

    expect(actual).toEqual(expected);
  });
});
