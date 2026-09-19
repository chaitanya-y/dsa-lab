const assert = require("node:assert/strict");
const test = require("node:test");
const {
  topKFrequent,
  topKFrequentSorted,
} = require("../../javascript/problems/arrays_hashing/topKFrequentElements");

test("topKFrequentSorted returns the two most frequent numbers", () => {
  assert.deepEqual(topKFrequentSorted([1, 1, 1, 2, 2, 3], 2), [1, 2]);
});

test("topKFrequent returns the two most frequent numbers", () => {
  assert.deepEqual(topKFrequent([1, 1, 1, 2, 2, 3], 2), [1, 2]);
});

test("topKFrequent handles negative numbers", () => {
  assert.deepEqual(topKFrequent([-1, -1, -2, -2, -2, 5], 1), [-2]);
});

test("topKFrequent returns every unique number when k matches their count", () => {
  assert.deepEqual(topKFrequent([4, 4, 6, 6], 2).sort(), [4, 6]);
});
