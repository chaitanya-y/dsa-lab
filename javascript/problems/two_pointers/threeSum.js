/**
 * 3Sum
 *
 * Return every unique group of three numbers whose sum is 0.
 *
 * Example: [-1, 0, 1, 2, -1, -4] returns
 * [[-1, -1, 2], [-1, 0, 1]].
 *
 * n = number of values in nums.
 *
 * How to test:
 * Test file: tests/javascript/threeSum.test.js
 * Run: node --test tests/javascript/threeSum.test.js
 */

/**
 * Brute force: try every possible group of three indexes.
 *
 * Time: O(n^3), because three nested loops can each run n times.
 * Space: O(n) for the unique triplets we return.
 */
function threeSumBruteForce(nums) {
  // Store text keys so the same triplet is saved only once.
  const uniqueTriplets = new Set();

  // Choose the first index of a triplet.
  for (let first = 0; first < nums.length - 2; first += 1) {
    // Choose the second index after the first index.
    for (let second = first + 1; second < nums.length - 1; second += 1) {
      // Choose the third index after the second index.
      for (let third = second + 1; third < nums.length; third += 1) {
        // Add the three chosen values.
        const sum = nums[first] + nums[second] + nums[third];

        // Save only groups whose sum is zero.
        if (sum === 0) {
          // Sort the three values so the same values always make the same key.
          const triplet = [nums[first], nums[second], nums[third]].sort(
            (left, right) => left - right,
          );
          // Join the sorted values into one unique Set key.
          uniqueTriplets.add(triplet.join(","));
        }
      }
    }
  }

  // Turn keys such as "-1,0,1" back into arrays of numbers.
  return [...uniqueTriplets].map((key) => key.split(",").map(Number));
}

/**
 * Optimized: sort, fix one number, then use two pointers for the other two.
 *
 * Time: O(n^2): sorting is O(n log n), then the outer loop and each
 * two-pointer scan together do O(n) * O(n) work.
 * Space: O(n) for the sorted copy and returned triplets.
 */
function threeSum(nums) {
  // Make a sorted copy so we do not change the original input array.
  const sortedNums = [...nums].sort((left, right) => left - right);
  // Store the unique triplets we find.
  const triplets = [];

  // Fix one value; leave room for a left and right value after it.
  for (let i = 0; i < sortedNums.length - 2; i += 1) {
    // Skip a repeated fixed value because it would make duplicate triplets.
    if (i > 0 && sortedNums[i] === sortedNums[i - 1]) {
      continue;
    }

    // Start the left pointer immediately after the fixed value.
    let left = i + 1;
    // Start the right pointer at the final value.
    let right = sortedNums.length - 1;

    // Keep searching until the two pointers meet.
    while (left < right) {
      // Add the fixed value and the two pointer values.
      const sum = sortedNums[i] + sortedNums[left] + sortedNums[right];

      // A sum that is too small needs a larger left value.
      if (sum < 0) {
        left += 1;
      // A sum that is too large needs a smaller right value.
      } else if (sum > 0) {
        right -= 1;
      } else {
        // A zero sum is one answer.
        triplets.push([sortedNums[i], sortedNums[left], sortedNums[right]]);
        // Move past the pair we just used.
        left += 1;
        right -= 1;

        // We already saved a triplet using the old left value.
        // After `left += 1`, left may point to the same value again.
        // Example: after saving [-2, 0, 2], another 0 would make
        // [-2, 0, 2] again, which is a duplicate answer.
        // Compare the new value with the previous left value and keep moving
        // while they are equal. `left < right` makes sure pointers do not cross.
        while (left < right && sortedNums[left] === sortedNums[left - 1]) {
          left += 1;
        }

        // The left skip already prevents duplicate output here.
        // This right skip also avoids repeated checks and keeps both sides symmetric.
        while (left < right && sortedNums[right] === sortedNums[right + 1]) {
          right -= 1;
        }
      }
    }
  }

  // Return every unique zero-sum triplet.
  return triplets;
}

module.exports = { threeSum, threeSumBruteForce };
