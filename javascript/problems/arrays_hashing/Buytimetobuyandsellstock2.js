// Problem

// Now you may complete as many transactions as you like, but:

// you must sell before you buy again

// // Return the maximum profit.



function maxProfit(prices) {
  let totalProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      totalProfit += prices[i] - prices[i - 1];
    }
  }

  return totalProfit;
}