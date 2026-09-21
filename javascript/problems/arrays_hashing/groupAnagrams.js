/**
 * Group Anagrams
 *
 * Question:
 * Given a list of strings, group words that are anagrams of each other.
 * Anagrams contain the same characters with the same counts.
 *
 * In the complexity comments below:
 * n = number of words, m = length of the longest word.
 *
 * How to test:
 * Test file: tests/javascript/groupAnagrams.test.js
 * Run: node --test tests/javascript/groupAnagrams.test.js
 */

/**
 * Brute force: compare each word with the first word in every group.
 *
 * n = number of words, m = length of the longest word.
 * Time: O(n^2 * m log m), because we may compare a word with many groups
 * and sorting one word takes O(m log m).
 * Space: O(n * m), for the returned groups.
 *
 * @param {string[]} strs
 * @returns {string[][]}
 */
function groupAnagramsBruteForce(strs) {
  const groups = [];

  for (const word of strs) {
    const sortedWord = word.split("").sort().join("");
    let placed = false;

    for (const group of groups) {
      const sortedRepresentative = group[0].split("").sort().join("");

      if (sortedWord === sortedRepresentative) {
        group.push(word);
        placed = true;
        break;
      }
    }

    if (!placed) {
      groups.push([word]);
    }
  }

  return groups;
}

/**
 * Sorted-key solution: words with the same sorted characters are anagrams.
 *
 * n = number of words, m = length of the longest word.
 * Time: O(n * m log m), because every word is sorted once.
 * Space: O(n * m), for the Map and returned groups.
 *
 * @param {string[]} strs
 * @returns {string[][]}
 */
function groupAnagramsSorted(strs) {
  const groups = new Map();

  for (const word of strs) {
    const sortedWord = word.split("").sort().join("");

    if (!groups.has(sortedWord)) {
      groups.set(sortedWord, []);
    }

    groups.get(sortedWord).push(word);
  }

  return Array.from(groups.values());
}

/**
 * Optimized: use the count of all 26 lowercase letters as a Map key.
 * All anagrams create the same count array.
 *
 * n = number of words, m = length of the longest word.
 * Time: O(n * m), because we read every character once.
 * Space: O(n * m), for the Map and returned groups.
 *
 * @param {string[]} strs
 * @returns {string[][]}
 */
function groupAnagrams(strs) {
  const groups = new Map();

  for (const word of strs) {
    const count = Array(26).fill(0);

    for (const char of word) {
      count[char.charCodeAt(0) - "a".charCodeAt(0)] += 1;
    }

    // Arrays are compared by reference in JavaScript, so use a string key.
    const key = count.join(",");

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(word);
  }

  return Array.from(groups.values());
}

module.exports = { groupAnagrams, groupAnagramsBruteForce, groupAnagramsSorted };
