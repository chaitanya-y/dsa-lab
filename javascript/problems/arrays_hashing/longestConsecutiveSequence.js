/**
 * Longest Consecutive Sequence
 *
 * Return the length of the longest sequence of numbers that increase by 1.
 * The sequence numbers do not need to be next to each other in nums.
 *
 * Example: [100, 4, 200, 1, 3, 2] has the sequence 1, 2, 3, 4.
 * Answer: 4.
 *
 * n = number of values in nums.
 *
 * How to test:
 * Test file: tests/javascript/longestConsecutiveSequence.test.js
 * Run: node --test tests/javascript/longestConsecutiveSequence.test.js
 */

/**
 * Brute force: begin at every number and keep asking whether the next number
 * is somewhere in the original array.
 *
 * It works, but Array.includes searches the whole array. We repeat that
 * search many times while counting each possible sequence.
 *
 * Time: O(n^3) in the worst case.
 * Space: O(1), not counting the input.
 */
function longestConsecutiveBruteForce(nums) {
  let longest = 0;

  for (const num of nums) {
    let length = 1;
    let next = num + 1;

    while (nums.includes(next)) {
      length += 1;
      next += 1;
    }

    longest = Math.max(longest, length);
  }

  return longest;
}

/**
 * Optimized: put the numbers in a Set for fast membership checks.
 *
 * Only count from the START of a sequence. A number is a start when its
 * previous number does not exist. For 1, 2, 3, 4, only 1 starts counting;
 * 2, 3, and 4 are skipped because they have a previous number.
 *
 * Time: O(n) on average. Each unique number is checked a small number of times.
 * Space: O(n) for the Set of unique values.
 */
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longest = 0;

  for (const num of numSet) {
    // num is not a start if num - 1 is already in the sequence.
    if (numSet.has(num - 1)) {
      continue;
    }

    let length = 1;
    let next = num + 1;

    while (numSet.has(next)) {
      length += 1;
      next += 1;
    }

    longest = Math.max(longest, length);
  }

  return longest;
}

module.exports = { longestConsecutive, longestConsecutiveBruteForce };
