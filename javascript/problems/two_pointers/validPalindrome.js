/**
 * Valid Palindrome
 *
 * Return true when a string reads the same forward and backward after we
 * ignore punctuation, spaces, and uppercase/lowercase differences.
 *
 * Example: "A man, a plan, a canal: Panama" is true.
 *
 * n = number of characters in s.
 *
 * How to test:
 * Test file: tests/javascript/validPalindrome.test.js
 * Run: node --test tests/javascript/validPalindrome.test.js
 */

function isAlphanumeric(char) {
  const code = char.charCodeAt(0);

  return (
    (code >= "A".charCodeAt(0) && code <= "Z".charCodeAt(0)) ||
    (code >= "a".charCodeAt(0) && code <= "z".charCodeAt(0)) ||
    (code >= "0".charCodeAt(0) && code <= "9".charCodeAt(0))
  );
}

/**
 * Simple solution: make a cleaned lowercase string, reverse it, and compare.
 *
 * Time: O(n), because we read the string a few times.
 * Space: O(n), because cleaned and reversed strings are created.
 */
function isPalindromeBruteForce(s) {
  const cleaned = s
    .toLowerCase()
    .split("")
    .filter(isAlphanumeric)
    .join("");

  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

/**
 * Optimized: compare from both ends without building another string.
 *
 * left moves from the beginning; right moves from the end. Both skip
 * punctuation and spaces. A mismatch means the string is not a palindrome.
 *
 * Time: O(n): each pointer only moves inward.
 * Space: O(1): only two indexes are stored.
 */
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) {
      left += 1;
    }

    while (left < right && !isAlphanumeric(s[right])) {
      right -= 1;
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left += 1;
    right -= 1;
  }

  return true;
}

module.exports = { isPalindrome, isPalindromeBruteForce };
