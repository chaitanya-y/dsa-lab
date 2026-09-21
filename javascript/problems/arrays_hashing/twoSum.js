/**
 * Two Sum
 *
 * Question:
 * Given an integer array `nums` and a target, return the indices of two
 * numbers whose sum equals the target. Do not use the same element twice.
 * Return [] when no pair exists.
 *
 * How to test:
 * Test file: tests/javascript/twoSum.test.js
 * Run: node --test tests/javascript/twoSum.test.js
 */

/**
 * Brute force: try every pair of indices.
 *
 * Time: O(n^2), because the nested loops can compare every pair.
 * Space: O(1), because no extra collection is created.
 *
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[]}
 */
function twoSumBruteForce(nums, target) {
  for (let left = 0; left < nums.length; left += 1) {
    for (let right = left + 1; right < nums.length; right += 1) {
      if (nums[left] + nums[right] === target) {
        return [left, right];
      }
    }
  }

  return [];
}

/**
 * Optimized: remember numbers already visited in a Map.
 * For each number, check whether its complement was seen earlier.
 *
 * Time: O(n), because we scan the array once.
 * Space: O(n), because the Map can store up to n numbers.
 *
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[]}
 */
function twoSum(nums, target) {
  const seen = new Map(); // number -> index

  for (let i = 0; i < nums.length; i += 1) {
    const complement = target - nums[i];

    // If complement appeared earlier, we found the pair.
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    // Remember the current number for future iterations.
    seen.set(nums[i], i);
  }

  return [];
}

module.exports = { twoSum, twoSumBruteForce };
