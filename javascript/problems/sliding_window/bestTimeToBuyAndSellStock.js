/**
 * Best Time to Buy and Sell Stock
 *
 * Choose one day to buy and a later day to sell for the largest profit.
 * Return 0 when no profitable sale exists.
 *
 * n = number of prices.
 *
 * How to test:
 * Test file: tests/javascript/bestTimeToBuyAndSellStock.test.js
 * Run: node --test tests/javascript/bestTimeToBuyAndSellStock.test.js
 */

/**
 * Brute force: try every buy day with every later sell day.
 *
 * Time: O(n^2), because two loops try every valid buy/sell pair.
 * Space: O(1), because we store only number variables.
 */
function maxProfitBruteForce(prices) {
  // Store the best profit found so far.
  let maxProfit = 0;

  // Choose a day to buy.
  for (let buyDay = 0; buyDay < prices.length - 1; buyDay += 1) {
    // Choose a later day to sell.
    for (let sellDay = buyDay + 1; sellDay < prices.length; sellDay += 1) {
      // Subtract the buying price from the selling price.
      const profit = prices[sellDay] - prices[buyDay];
      // Keep the best profit; a loss never replaces the starting 0.
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  // Return the largest possible profit.
  return maxProfit;
}

/**
 * Optimized: remember the lowest buying price seen before each selling day.
 *
 * Time: O(n), because we read each price once.
 * Space: O(1), because we store only two number variables.
 */
function maxProfit(prices) {
  // Begin by treating the first price as the lowest buying price so far.
  let lowestBuyPrice = prices[0];
  // Start with no profit because we may never find a profitable sale.
  let maxProfitSoFar = 0;

  // Check every later price as a possible selling price.
  for (let sellDay = 1; sellDay < prices.length; sellDay += 1) {
    // Read today's price once for clarity.
    const sellPrice = prices[sellDay];

    // A lower price is a better future buying day.
    if (sellPrice < lowestBuyPrice) {
      lowestBuyPrice = sellPrice;
    } else {
      // Otherwise, calculate profit from the best earlier buy to today.
      const profit = sellPrice - lowestBuyPrice;
      // Keep the best profit seen across all selling days.
      maxProfitSoFar = Math.max(maxProfitSoFar, profit);
    }
  }

  // Return the best profit found.
  return maxProfitSoFar;
}

module.exports = { maxProfit, maxProfitBruteForce };
