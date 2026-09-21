/**
 * Contains Duplicate
 *
 * Question:
 * Given an integer array `nums`, return `true` when any value appears at
 * least twice. Otherwise, return `false`.
 *
 * This file includes a brute-force comparison and an optimized hash-set
 * solution. Use the hash-set version in an interview.
 *
 * How to test:
 * Test file: tests/javascript/containsDuplicate.test.js
 * Run: node --test tests/javascript/containsDuplicate.test.js
 */

/**
 * Brute force: compare each number with every number to its right.
 *
 * Time complexity: O(n^2)
 * Extra space: O(1)
 *
 * @param {number[]} nums
 * @returns {boolean}
 */
function hasDuplicateBruteForce(nums) {
  // Compare each number with every number to its right.
  for (let left = 0; left < nums.length; left += 1) {
    for (let right = left + 1; right < nums.length; right += 1) {
      if (nums[left] === nums[right]) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Optimized hash-set solution: record every number already visited. JavaScript
 * `Set` stores unique values, and `seen.has(num)` checks membership quickly.
 * If the current number is already in the set, a duplicate exists.
 *
 * Time: O(n), because we scan the array once.
 * Extra space: O(n) in the worst case, because the Set may store every value.
 *
 * @param {number[]} nums
 * @returns {boolean}
 */
function hasDuplicate(nums) {
  // Python's set() is the equivalent of JavaScript's Set.
  const seen = new Set();

  for (const num of nums) {
    // has() asks whether we have already seen this number.
    if (seen.has(num)) {
      return true;
    }

    // add() remembers this number for later checks.
    seen.add(num);
  }

  return false;
}

module.exports = { hasDuplicate, hasDuplicateBruteForce };
