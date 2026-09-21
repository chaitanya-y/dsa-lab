const assert = require("node:assert/strict");
const test = require("node:test");
const {
  threeSum,
  threeSumBruteForce,
} = require("../../javascript/problems/two_pointers/threeSum");

function normalize(triplets) {
  return triplets
    .map((triplet) => [...triplet].sort((left, right) => left - right))
    .sort((left, right) => left.join(",").localeCompare(right.join(",")));
}

const NUMBERS = [-1, 0, 1, 2, -1, -4];
const EXPECTED = [[-1, -1, 2], [-1, 0, 1]];

test("threeSumBruteForce returns each unique zero-sum triplet", () => {
  assert.deepEqual(normalize(threeSumBruteForce(NUMBERS)), normalize(EXPECTED));
});

test("threeSum returns each unique zero-sum triplet", () => {
  assert.deepEqual(normalize(threeSum(NUMBERS)), normalize(EXPECTED));
});

test("threeSum returns no triplets when every number is positive", () => {
  assert.deepEqual(threeSum([1, 2, 3]), []);
});

test("threeSum returns one triplet for three zeroes", () => {
  assert.deepEqual(threeSum([0, 0, 0, 0]), [[0, 0, 0]]);
});
