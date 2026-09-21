/**
 * Product of Array Except Self
 *
 * Given nums, make answer where answer[i] is the product of every value
 * except nums[i]. Do not use division.
 *
 * Example: nums = [2, 3, 4]
 * - For index 0, multiply 3 * 4 = 12
 * - For index 1, multiply 2 * 4 = 8
 * - For index 2, multiply 2 * 3 = 6
 * Answer: [12, 8, 6]
 *
 * n = the number of values in nums.
 *
 * How to test:
 * Test file: tests/javascript/productOfArrayExceptSelf.test.js
 * Run: node --test tests/javascript/productOfArrayExceptSelf.test.js
 */

/**
 * Method 1: Brute force.
 *
 * For every index, visit every value again and skip the current index.
 * It is easy to understand, but it repeats a lot of multiplication work.
 *
 * Time: O(n^2) because the outer loop and inner loop both can run n times.
 * Extra space: O(1), not counting the answer array we must return.
 */
function productExceptSelfBruteForce(nums) {
  const answer = [];

  for (let i = 0; i < nums.length; i += 1) {
    let product = 1;

    for (let j = 0; j < nums.length; j += 1) {
      if (i !== j) {
        product *= nums[j];
      }
    }

    answer.push(product);
  }

  return answer;
}

/**
 * Method 2: Store the work from both sides.
 *
 * left[i] is the product of all values BEFORE i.
 * right[i] is the product of all values AFTER i.
 * Their multiplication gives the product of every value except nums[i].
 *
 * For [2, 3, 4]:
 * left  = [1, 2, 6]   // nothing before 2, then 2, then 2 * 3
 * right = [12, 4, 1]  // 3 * 4, then 4, then nothing after 4
 * answer = [12, 8, 6] // left[i] * right[i]
 *
 * 1 means "there are no numbers on this side." Multiplying by 1 changes
 * nothing, so it is the right starting value.
 *
 * Time: O(n): each loop visits the array once.
 * Extra space: O(n): left and right are extra arrays.
 */
function productExceptSelfWithArrays(nums) {
  const n = nums.length;
  const left = Array(n).fill(1);
  const right = Array(n).fill(1);

  for (let i = 1; i < n; i += 1) {
    left[i] = left[i - 1] * nums[i - 1];
  }

  for (let i = n - 2; i >= 0; i -= 1) {
    right[i] = right[i + 1] * nums[i + 1];
  }

  return left.map((leftProduct, i) => leftProduct * right[i]);
}

/**
 * Method 3: Optimized version.
 *
 * This is the same idea as Method 2, but we do not keep a separate left
 * array and right array:
 * 1. Put each left product directly into answer.
 * 2. Walk from right to left with one running suffix product and multiply it
 *    into answer.
 *
 * Time: O(n): two passes through nums.
 * Extra space: O(1), not counting answer. The answer array is required output,
 * so we reuse it instead of allocating left and right arrays.
 */
function productExceptSelf(nums) {
  const answer = Array(nums.length).fill(1);

  // First pass: answer[i] becomes the product of values before i.
  let prefix = 1;
  for (let i = 0; i < nums.length; i += 1) {
    answer[i] = prefix;
    prefix *= nums[i];
  }

  // Second pass: multiply in the product of values after i.
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i -= 1) {
    answer[i] *= suffix;
    // JavaScript can represent negative zero (-0), but this answer should
    // simply show 0 when a multiplication includes zero.
    if (answer[i] === 0) {
      answer[i] = 0;
    }
    suffix *= nums[i];
  }

  return answer;
}

module.exports = {
  productExceptSelf,
  productExceptSelfBruteForce,
  productExceptSelfWithArrays,
};
