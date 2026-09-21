const assert = require("node:assert/strict");
const test = require("node:test");
const {
  maxProfit,
  maxProfitBruteForce,
} = require("../../javascript/problems/sliding_window/bestTimeToBuyAndSellStock");

test("maxProfitBruteForce finds the best buy and later sell day", () => {
  assert.equal(maxProfitBruteForce([7, 1, 5, 3, 6, 4]), 5);
});

test("maxProfit finds the best buy and later sell day", () => {
  assert.equal(maxProfit([7, 1, 5, 3, 6, 4]), 5);
});

test("maxProfit returns zero when prices always fall", () => {
  assert.equal(maxProfit([7, 6, 4, 3, 1]), 0);
});

test("maxProfit can sell after a new lowest price", () => {
  assert.equal(maxProfit([2, 4, 1, 7]), 6);
});
