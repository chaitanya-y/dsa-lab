/**
 * Container With Most Water
 *
 * Choose two vertical lines that hold the most water.
 * Water = distance between the lines * shorter line height.
 *
 * n = number of heights.
 *
 * How to test:
 * Test file: tests/javascript/containerWithMostWater.test.js
 * Run: node --test tests/javascript/containerWithMostWater.test.js
 */

/**
 * Brute force: calculate the water area for every pair of lines.
 *
 * Time: O(n^2), because the two loops try every pair.
 * Space: O(1), because we store only a few variables.
 */
function maxAreaBruteForce(heights) {
  // Store the largest area found so far.
  let largestArea = 0;

  // Choose the left wall.
  for (let left = 0; left < heights.length - 1; left += 1) {
    // Choose every possible right wall after the left wall.
    for (let right = left + 1; right < heights.length; right += 1) {
      // The indexes tell us the horizontal distance between the walls.
      const width = right - left;
      // The shorter wall limits how high the water can be.
      const shorterHeight = Math.min(heights[left], heights[right]);
      // Area is width multiplied by the water height.
      const area = width * shorterHeight;
      // Keep the largest area seen so far.
      largestArea = Math.max(largestArea, area);
    }
  }

  // Return the best area after checking every pair.
  return largestArea;
}

/**
 * Optimized: begin with the widest pair, then move the shorter wall inward.
 *
 * Time: O(n), because each pointer moves inward at most n times total.
 * Space: O(1), because we store only indexes and area variables.
 */
function maxArea(heights) {
  // Begin with the leftmost wall.
  let left = 0;
  // Begin with the rightmost wall.
  let right = heights.length - 1;
  // Store the largest area found so far.
  let largestArea = 0;

  // Stop when the two pointers meet because a wall cannot pair with itself.
  while (left < right) {
    // Find the horizontal distance between the two current walls.
    const width = right - left;
    // The shorter current wall limits the water height.
    const shorterHeight = Math.min(heights[left], heights[right]);
    // Calculate the current container area.
    const area = width * shorterHeight;
    // Save the current area if it is larger than the previous best.
    largestArea = Math.max(largestArea, area);

    // If left is shorter, moving right would only reduce width while left
    // still limits height. Move left to search for a taller limiting wall.
    if (heights[left] < heights[right]) {
      left += 1;
    } else {
      // If right is shorter or equal, move right for the same reason.
      right -= 1;
    }
  }

  // Return the largest area found by the two pointers.
  return largestArea;
}

module.exports = { maxArea, maxAreaBruteForce };
