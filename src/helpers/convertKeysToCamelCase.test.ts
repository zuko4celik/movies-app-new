import { convertKeysToCamelCase } from './';

describe('convertKeysToCamelCase helper', () => {
  test('convert keys to camel case from object', () => {
    const actual = convertKeysToCamelCase({
      first_name: 'John',
      last_name: 'Doe',
    });
    const expected = {
      firstName: 'John',
      lastName: 'Doe',
    };

    expect(actual).toEqual(expected);
  });

  test('convert keys to camel case from array of objects', () => {
    const actual = convertKeysToCamelCase([
      {
        first_name: 'John',
        last_name: 'Doe',
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
      },
    ]);
    const expected = [
      {
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
      },
    ];

    expect(actual).toEqual(expected);
  });

  test('convert keys to camel case from nested object', () => {
    const actual = convertKeysToCamelCase({
      first_name: 'John',
      last_name: 'Doe',
      address: {
        street_name: 'Main St',
        city_name: 'New York',
      },
    });
    const expected = {
      firstName: 'John',
      lastName: 'Doe',
      address: {
        streetName: 'Main St',
        cityName: 'New York',
      },
    };

    expect(actual).toEqual(expected);
  });

  test('convert keys to camel case from nested array of objects', () => {
    const actual = convertKeysToCamelCase([
      {
        first_name: 'John',
        last_name: 'Doe',
        address: {
          street_name: 'Main St',
          city_name: 'New York',
        },
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        address: {
          street_name: 'Second St',
          city_name: 'Los Angeles',
        },
      },
    ]);
    const expected = [
      {
        firstName: 'John',
        lastName: 'Doe',
        address: {
          streetName: 'Main St',
          cityName: 'New York',
        },
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        address: {
          streetName: 'Second St',
          cityName: 'Los Angeles',
        },
      },
    ];

    expect(actual).toEqual(expected);
  });

  test('convert keys to camel case from nested object with array', () => {
    const actual = convertKeysToCamelCase({
      first_name: 'John',
      last_name: 'Doe',
      addresses: [
        {
          street_name: 'Main St',
          city_name: 'New York',
        },
        {
          street_name: 'Second St',
          city_name: 'Los Angeles',
        },
      ],
    });
    const expected = {
      firstName: 'John',
      lastName: 'Doe',
      addresses: [
        {
          streetName: 'Main St',
          cityName: 'New York',
        },
        {
          streetName: 'Second St',
          cityName: 'Los Angeles',
        },
      ],
    };

    expect(actual).toEqual(expected);
  });

  test('should return the same value if it is not an object or array', () => {
    const actual = convertKeysToCamelCase('Hello World');
    const expected = 'Hello World';

    expect(actual).toEqual(expected);
  });
});
