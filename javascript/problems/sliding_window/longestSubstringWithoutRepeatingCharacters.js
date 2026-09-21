/**
 * Longest Substring Without Repeating Characters
 *
 * Return the length of the longest consecutive part of s with no repeated
 * characters.
 *
 * n = number of characters in s.
 *
 * How to test:
 * Test file: tests/javascript/longestSubstringWithoutRepeatingCharacters.test.js
 * Run: node --test tests/javascript/longestSubstringWithoutRepeatingCharacters.test.js
 */

/**
 * Brute force: begin every possible substring and stop when it repeats.
 *
 * Time: O(n^2), because each starting character may scan many later characters.
 * Space: O(n), for the Set that tracks one substring.
 */
function lengthOfLongestSubstringBruteForce(s) {
  // Store the longest unique substring length found so far.
  let longestLength = 0;

  // Try every character as the starting point of a substring.
  for (let start = 0; start < s.length; start += 1) {
    // Track characters in the substring beginning at start.
    const characters = new Set();

    // Extend this substring one character at a time.
    for (let end = start; end < s.length; end += 1) {
      // Read the new character at the end of this substring.
      const char = s[end];

      // A repeated character means this substring cannot grow further.
      if (characters.has(char)) {
        break;
      }

      // Add the new unique character to this substring.
      characters.add(char);
      // Update the longest length using the two indexes.
      longestLength = Math.max(longestLength, end - start + 1);
    }
  }

  // Return the largest unique substring length.
  return longestLength;
}

/**
 * Optimized sliding window: move left only when a duplicate enters the window.
 *
 * Time: O(n), because each character is added once and removed at most once.
 * Space: O(n), for the Set holding the current window characters.
 */
function lengthOfLongestSubstring(s) {
  // left marks the beginning of the current unique window.
  let left = 0;
  // Store the best window length found so far.
  let longestLength = 0;
  // Store characters currently inside the window from left through right.
  const characters = new Set();

  // right expands the window by visiting every character once.
  for (let right = 0; right < s.length; right += 1) {
    // Read the character that is trying to enter the window.
    const char = s[right];

    // Keep shrinking from the left until char is no longer a duplicate.
    while (characters.has(char)) {
      // Remove the character that is leaving the window.
      characters.delete(s[left]);
      // Move the beginning of the window rightward.
      left += 1;
    }

    // Add char now that the window has no duplicate char.
    characters.add(char);
    // right - left + 1 is the current window length.
    longestLength = Math.max(longestLength, right - left + 1);
  }

  // Return the largest unique window length.
  return longestLength;
}

module.exports = {
  lengthOfLongestSubstring,
  lengthOfLongestSubstringBruteForce,
};
