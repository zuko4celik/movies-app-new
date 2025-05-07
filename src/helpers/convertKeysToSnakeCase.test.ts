import { convertKeysToSnakeCase } from '.';

describe('convertKeysToSnakeCase helper', () => {
  test('should convert object keys to snake_case', () => {
    const input = {
      firstName: 'John',
      lastName: 'Doe',
      address: {
        streetAddress: '123 Main St',
        city: 'New York',
      },
    };

    const expectedOutput = {
      first_name: 'John',
      last_name: 'Doe',
      address: {
        street_address: '123 Main St',
        city: 'New York',
      },
    };

    expect(convertKeysToSnakeCase(input)).toEqual(expectedOutput);
  });

  test('should convert array of objects keys to snake_case', () => {
    const input = [
      {
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
      },
    ];

    const expectedOutput = [
      {
        first_name: 'John',
        last_name: 'Doe',
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
      },
    ];

    expect(convertKeysToSnakeCase(input)).toEqual(expectedOutput);
  });

  test('should convert nested object keys to snake_case', () => {
    const input = {
      user: {
        firstName: 'John',
        lastName: 'Doe',
        address: {
          streetAddress: '123 Main St',
          city: 'New York',
        },
      },
    };

    const expectedOutput = {
      user: {
        first_name: 'John',
        last_name: 'Doe',
        address: {
          street_address: '123 Main St',
          city: 'New York',
        },
      },
    };

    expect(convertKeysToSnakeCase(input)).toEqual(expectedOutput);
  });

  test('should convert nested array of objects keys to snake_case', () => {
    const input = [
      {
        user: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
      {
        user: {
          firstName: 'Jane',
          lastName: 'Smith',
        },
      },
    ];

    const expectedOutput = [
      {
        user: {
          first_name: 'John',
          last_name: 'Doe',
        },
      },
      {
        user: {
          first_name: 'Jane',
          last_name: 'Smith',
        },
      },
    ];

    expect(convertKeysToSnakeCase(input)).toEqual(expectedOutput);
  });

  test('should return non-object values unchanged', () => {
    const input = 'Hello, World!';
    const expectedOutput = 'Hello, World!';

    expect(convertKeysToSnakeCase(input)).toEqual(expectedOutput);
  });
});
