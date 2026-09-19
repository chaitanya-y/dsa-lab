/**
 * Top K Frequent Elements
 *
 * Given nums and k, return the k numbers that appear most often.
 *
 * Example: nums = [1, 1, 1, 2, 2, 3], k = 2
 * 1 appears 3 times, 2 appears 2 times, and 3 appears 1 time.
 * Answer: [1, 2]
 *
 * n = total number of values in nums.
 * u = number of unique values in nums.
 */

/**
 * First solution: count values, then sort the number/frequency pairs.
 *
 * Time: O(n + u log u)
 * - Count every number once: O(n)
 * - Sort u unique number/frequency pairs: O(u log u)
 *
 * Space: O(u) for the frequency Map and sorted pairs.
 */
function topKFrequentSorted(nums, k) {
  const count = new Map();

  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }

  // Map entries look like [number, frequency]. Sort by frequency, largest first.
  const sortedItems = [...count.entries()].sort((first, second) => second[1] - first[1]);

  return sortedItems.slice(0, k).map(([num]) => num);
}

/**
 * Optimized solution: use the frequency as a bucket index.
 *
 * A number cannot appear more than n times. That means buckets[frequency]
 * can hold every number that appeared exactly frequency times.
 *
 * Example:
 * nums = [1, 1, 1, 2, 2, 3]
 * buckets[1] = [3]
 * buckets[2] = [2]
 * buckets[3] = [1]
 *
 * Walk backward through buckets, from high frequency to low frequency,
 * and stop after collecting k numbers.
 *
 * Time: O(n): count, fill buckets, and scan at most n bucket positions.
 * Space: O(n): the Map and buckets can together hold up to n values.
 */
function topKFrequent(nums, k) {
  const count = new Map();

  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }

  const buckets = Array.from({ length: nums.length + 1 }, () => []);

  for (const [num, frequency] of count) {
    buckets[frequency].push(num);
  }

  const answer = [];

  for (let frequency = nums.length; frequency >= 1; frequency -= 1) {
    for (const num of buckets[frequency]) {
      answer.push(num);

      if (answer.length === k) {
        return answer;
      }
    }
  }

  return answer;
}

module.exports = { topKFrequent, topKFrequentSorted };
