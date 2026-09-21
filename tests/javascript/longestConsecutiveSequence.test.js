const assert = require("node:assert/strict");
const test = require("node:test");
const {
  longestConsecutive,
  longestConsecutiveBruteForce,
} = require("../../javascript/problems/arrays_hashing/longestConsecutiveSequence");

const NUMBERS = [100, 4, 200, 1, 3, 2];

test("longestConsecutiveBruteForce finds a sequence split across the array", () => {
  assert.equal(longestConsecutiveBruteForce(NUMBERS), 4);
});

test("longestConsecutive finds a sequence split across the array", () => {
  assert.equal(longestConsecutive(NUMBERS), 4);
});

test("longestConsecutive ignores duplicate values", () => {
  assert.equal(longestConsecutive([1, 2, 2, 3]), 3);
});

test("longestConsecutive returns zero for an empty list", () => {
  assert.equal(longestConsecutive([]), 0);
});
