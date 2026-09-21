const assert = require("node:assert/strict");
const test = require("node:test");
const {
  maxArea,
  maxAreaBruteForce,
} = require("../../javascript/problems/two_pointers/containerWithMostWater");

const HEIGHTS = [1, 8, 6, 2, 5, 4, 8, 3, 7];

test("maxAreaBruteForce finds the largest container", () => {
  assert.equal(maxAreaBruteForce(HEIGHTS), 49);
});

test("maxArea finds the largest container", () => {
  assert.equal(maxArea(HEIGHTS), 49);
});

test("maxArea handles two lines", () => {
  assert.equal(maxArea([1, 1]), 1);
});

test("maxArea can find the best container inside the array", () => {
  assert.equal(maxArea([1, 2, 1]), 2);
});
