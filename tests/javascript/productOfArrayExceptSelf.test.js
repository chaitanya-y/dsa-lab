const assert = require("node:assert/strict");
const test = require("node:test");
const {
  productExceptSelf,
  productExceptSelfBruteForce,
  productExceptSelfWithArrays,
} = require("../../javascript/problems/arrays_hashing/productOfArrayExceptSelf");

const NUMBERS = [1, 2, 3, 4];
const EXPECTED = [24, 12, 8, 6];

test("productExceptSelfBruteForce multiplies every number except the current one", () => {
  assert.equal(typeof productExceptSelfBruteForce, "function");
  assert.deepEqual(productExceptSelfBruteForce(NUMBERS), EXPECTED);
});

test("productExceptSelfWithArrays combines products on the left and right", () => {
  assert.equal(typeof productExceptSelfWithArrays, "function");
  assert.deepEqual(productExceptSelfWithArrays(NUMBERS), EXPECTED);
});

test("productExceptSelf returns the product of every other number", () => {
  assert.equal(typeof productExceptSelf, "function");
  assert.deepEqual(productExceptSelf(NUMBERS), EXPECTED);
});

test("productExceptSelf handles a zero without using division", () => {
  assert.deepEqual(productExceptSelf([-1, 1, 0, -3, 3]), [0, 0, 9, 0, 0]);
});

test("productExceptSelf returns 1 when one number has no other numbers", () => {
  assert.deepEqual(productExceptSelf([5]), [1]);
});
