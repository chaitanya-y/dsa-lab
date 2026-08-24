// Implement a function:parseQueryString(url)

import { hash } from "crypto";

// It should take a full URL string and return an object containing the query parameters.
// Rules
// Ignore everything before ?
// Ignore hash fragment after #
// If there is no query string, return {}
// Keys and values should be URL-decoded
// If a key appears multiple times, store all values in an array
// If a key has no value, treat it as an empty string

function parseQueryString(url) {
  const result = {};

  const queryStart = url.indexOf('?');
  if (queryStart === -1) {
    return result;
  }

  const hashStart = url.indexOf('#', queryStart);
  const queryString =
    hashStart === -1
      ? url.slice(queryStart + 1)
      : url.slice(queryStart + 1, hashStart);

  if (!queryString) {
    return result;
  }

  const pairs = queryString.split('&');

  for (const pair of pairs) {
    if (pair === '') continue;

    const equalIndex = pair.indexOf('=');

    let rawKey;
    let rawValue;

    if (equalIndex === -1) {
      rawKey = pair;
      rawValue = '';
    } else {
      rawKey = pair.slice(0, equalIndex);
      rawValue = pair.slice(equalIndex + 1);
    }

    // In query strings, '+' often represents a space.
    const key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
    const value = decodeURIComponent(rawValue.replace(/\+/g, ' '));

    if (result.hasOwnProperty(key)) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}
console.log(parseQueryString('https://example.com?tag=js&tag=react&tag=css'));