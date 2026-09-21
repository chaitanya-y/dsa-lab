/**
 * Valid Anagram
 *
 * Question:
 * Given two strings `s` and `t`, return `true` when `t` is an anagram of `s`.
 * An anagram uses exactly the same characters with exactly the same counts.
 *
 * This file includes a brute-force sorting solution and an optimized
 * frequency-counting solution. Use the optimized version in an interview.
 *
 * How to test:
 * Test file: tests/javascript/validAnagram.test.js
 * Run: node --test tests/javascript/validAnagram.test.js
 */

/**
 * Brute force: sort both strings and compare the sorted results.
 *
 * Time: O(n log n) because sorting n characters takes n log n time.
 * We sort twice, but 2 * n log n is still O(n log n).
 * Space: O(n) because split creates character arrays.
 *
 * @param {string} s
 * @param {string} t
 * @returns {boolean}
 */
function isAnagramBruteForce(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  return s.split("").sort().join("") === t.split("").sort().join("");
}

/**
 * Optimized: count each character in `s`, then subtract while reading `t`.
 *
 * Time: O(n) because we scan each string once: n + n = 2n, which is O(n).
 * Each count lookup is O(1) on average.
 * Space: O(k), where k is the number of different characters we store.
 *
 * @param {string} s
 * @param {string} t
 * @returns {boolean}
 */
function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const count = Object.create(null);

  for (const char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  for (const char of t) {
    if (!count[char]) {
      return false;
    }

    count[char] -= 1;
  }

  return true;
}

// Keep the repository's original function name available as an alias.
const validAnagram = isAnagram;

module.exports = { isAnagram, isAnagramBruteForce, validAnagram };
