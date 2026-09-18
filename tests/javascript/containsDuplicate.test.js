const assert = require("node:assert/strict");
const test = require("node:test");
const {
  hasDuplicate,
  hasDuplicateBruteForce,
} = require("../../javascript/problems/arrays_hashing/containsDuplicate");

test("hasDuplicateBruteForce returns true when a number appears twice", () => {
  assert.equal(typeof hasDuplicateBruteForce, "function");
  assert.equal(hasDuplicateBruteForce([1, 2, 3, 1]), true);
});

test("hasDuplicate returns true when a number appears twice", () => {
  assert.equal(hasDuplicate([1, 2, 3, 1]), true);
});

test("hasDuplicate returns false when every number is unique", () => {
  assert.equal(hasDuplicate([1, 2, 3, 4]), false);
});

test("hasDuplicate returns false for an empty array", () => {
  assert.equal(hasDuplicate([]), false);
});
