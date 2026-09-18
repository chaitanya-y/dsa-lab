const assert = require("node:assert/strict");
const test = require("node:test");
const {
  twoSum,
  twoSumBruteForce,
} = require("../../javascript/problems/arrays_hashing/twoSum");

test("twoSumBruteForce returns indices of a matching pair", () => {
  assert.equal(typeof twoSumBruteForce, "function");
  assert.deepEqual(twoSumBruteForce([2, 7, 11, 15], 9), [0, 1]);
});

test("twoSum returns indices of a matching pair", () => {
  assert.equal(typeof twoSum, "function");
  assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
});

test("twoSum handles duplicate values", () => {
  assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
});

test("twoSum returns an empty array when no pair exists", () => {
  assert.deepEqual(twoSum([1, 2, 3], 10), []);
});
