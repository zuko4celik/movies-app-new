const convertKeysToCamelCase = <T>(data: T): T => {
  if (Array.isArray(data)) {
    return data.map((item) => convertKeysToCamelCase(item) as unknown) as T;
    // Cast to 'unknown' inside map and then cast to 'T' outside the map
  } else if (typeof data === 'object' && data !== null) {
    const newObj: Record<string, unknown> = {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (match) => match[1].toUpperCase());
        newObj[camelCaseKey] =
          typeof data[key] === 'object'
            ? convertKeysToCamelCase(data[key] as unknown) // Cast to 'unknown' for recursive call
            : data[key];
      }
    }

    return newObj as T; // Cast the final result to 'T'
  }

  return data;
};

export default convertKeysToCamelCase;
